# Content & AI Domain: Context

## Business Vertical

Multi-department AI-powered content generation and governance platform (NEXOS). Manages content lifecycle from ideation through approval to publication, with RAG-backed research, real-time n8n automation, governance risk gates, and reputation monitoring across social platforms.

## Departments & Roles

### Enum: `departmentEnum`
- `global` — Executive strategy, company-wide initiatives
- `mkt` — Marketing & demand generation
- `cs` — Customer success & support content
- `comm` — Communications & PR
- `supp` — Support documentation

### Enum: `roleEnum`
- `system_executive` — Full system access
- `platform_admin` — Manage users, policies, integrations
- `dept_director` — Oversee department, approve content
- `dept_manager` — Create content, route approvals
- `dept_viewer` — View-only access to department content
- `service_account` — API access (n8n, webhooks)

## Content Lifecycle

### Pipeline States
```
drafted → governance_review → approved → published → (performance tracking)
         ↘ [blocked by risk] ↗
```

**Enum:** `approvalStatusEnum` (pending, pending_review, approved, rejected, published, processed, drafted)

### Governance System

#### Hard Rules
- **Type:** Conditional risk thresholds
- **Scope:** Department-level (e.g., "Marketing cannot post before legal review")
- **Action:** Pause, require_approval, notify, or log
- **Severity Levels:** freeze (halt all), pause (wait), require_approval, notify, log

#### Policies
- **Type:** Parameter-based constraints
- **Examples:** budget_cap (max spend), content_cadence (posts/day), fatigue_limit (user exposure frequency)
- **Structure:** `{policyType, parameterName, parameterValue (jsonb), active}`

#### Risk Assessment
- **Risk Levels:** low, medium, high, critical
- **Trigger Sources:**
  - Content similarity checks (plagiarism/brand guidelines)
  - Tone deviation (vs. brand voice)
  - Compliance flags (OFAC, restricted terms, etc.)
  - Historical performance (underperforming content type)

## Content Generation Pipeline

### RAG (Retrieval-Augmented Generation)
- **Embedding Model:** Cohere (Embed v3)
- **Vector DB:** PostgreSQL + pgvector (HNSW index, 1024-dim)
- **Chunk Strategy:** doc_chunks table, ~500-token windows
- **Query Flow:**
  1. User request → semantic search over `doc_chunks` + `insight_embeddings`
  2. Top-k relevant chunks → context for Claude prompt
  3. Claude generates content with citations to source documents

### Document Registry
- **Types:** company strategy, policy, segmentation, offer, compliance, learning, best_practice
- **Versioning:** mutations tracked per document
- **Approval Chain:** created → pending_review → approved → published

### Automated Workflows (n8n)

**Key Workflows:**
- **M5 Content Generation:** Trigger (manual or cron) → fetch research → generate drafts → route to approval
- **M3a1/M3a3 Social Scraping:** Instagram/LinkedIn scrapers → dump to database → sentiment analysis
- **Reputation Management:** Mention monitoring → alert on negative sentiment → escalate to leadership
- **Document Seeding:** Admin uploads doc → chunk & embed → index in RAG → available for generation
- **Approval Pipeline:** Draft created → notify department manager → collect approvals → publish
- **Discord Alerts:** Governance blocks, approval timeouts, performance anomalies → team notification

## Content Types & Platforms

### Enum: `contentTypeEnum`
- `social_post` — Twitter, LinkedIn, Instagram, TikTok, email
- `b2b_proposal` — Lead-focused commerce proposals
- `image` — Graphic design outputs
- `video` — Short-form (TikTok, Instagram Reels, YouTube Shorts)

### Enum: `platformEnum`
- `twitter` / `x`
- `linkedin`
- `instagram`
- `email`
- `youtube`
- `tiktok`
- `telegram`
- `blog`
- `coinmarketcap` (crypto-specific listing)
- `social` (generic social)

## Intelligence & Insights System

### Insight Embeddings
- **Source:** Web scraping, mention monitoring, industry research (Tavily API)
- **Content:** Extracted claims + key entities + domain relevance
- **Metadata:** source_url, detected_trend, claimHash (MD5 for dedup), imARunId (orchestrator run)
- **Usage:** Semantic search for background research, trend detection

### Strategic Signals
- **Trigger:** Insight hits relevance threshold + severity gate
- **Data:** summary (brief), executiveBrief (long-form), sourceInsightId
- **Severity:** freeze, pause, require_approval, notify, log
- **Distribution:** Escalate to department director via Discord/email

### Reputation Snapshots
- **Source:** Social listening (Instagram, LinkedIn, Twitter mentions)
- **Data:** rawFeedback (user comment), caption (source post), sentimentScore (-1 to +1)
- **Frequency:** Real-time capture, batched processing

### Reputation Risk Signals
- **Trigger:** Negative sentiment spike (>3σ from baseline) or repeated keywords
- **Data:** riskCategory (brand_attack, product_complaint, executive_criticism, misinformation)
- **Action:** Auto-escalate to Comm department, suggest response drafts

## Governance & Compliance

### System Health Tracking
- **Table:** `current_system_state` (per department)
- **Metrics:** riskLevelGlobal, riskScoreGlobal, activeRiskDomains, consolidationConfidence, sourceFreshness
- **Update Cadence:** Per workflow run (n8n trigger)

### Cost Tracking
- **Table:** `cost_log`
- **Tracked:** jobId, departmentId, modelId, promptTokens, completionTokens, totalUsd
- **Models:** Claude Opus (default `claude-opus-4-7`), Cohere (embeds), Google Vertex (optional)
- **Monitoring:** Monthly spend per department vs. budget_cap policy

### Learning & Knowledge Loop
- **Table:** `learning_entries`
- **Data:** conclusion (what worked), confidenceLevel, domain (e.g., "LinkedIn tactics for fintech"), supportingOutcomeIds
- **Supersession:** learningId can reference prior learning (version control)
- **Embedding:** Indexed for semantic search (HNSW), feeds future content gen prompts

## PR & Reputation Management

### Press Coverage Monitoring
- **Ingest:** RSS feeds, news APIs (Tavily), manual submissions
- **Fields:** outlet_name, outlet_tier (Tier1/2/3), coverage_type (earned/paid/owned), sentiment, keyClaims, entitiesMentioned, quotedSpokespeople
- **Dedup:** claimHash (MD5) prevents duplicate storage

### PR Content Generation
- **Trigger:** Approved milestone (product launch, funding, partnership)
- **Process:** AI generates press release → route to CMO → publish to newswires
- **Tracking:** modelUsed, temperature (0.2 for consistency), tokensUsed, similarityScore (vs. brand templates)

## Orchestration & Monitoring

### Orchestrator Run Logs
- **Lifecycle:** triggered (cron/manual) → staged (gen, gov, publish) → completed
- **Data:** currentStage, completionPercent, status (success/error/paused), summary
- **Dashboard:** Real-time visibility into pipeline health

### Command Queue (M8a Chat)
- **Purpose:** Players provide natural language instructions to system
- **Data:** rawPrompt, parsedIntent (jsonb), targetManager (which department/workflow), passivenessEvaluation
- **Processing:** Command validated → routed to handler → async execution

## References

- NEXOS (all schema files, n8n workflows, orchestrator)
- bifrost-framework (governance patterns, policy management)
