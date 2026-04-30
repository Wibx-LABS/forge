# Content & AI Domain: AI Prompts

## Content Generation per Platform

**Context:** Marketing department needs AI to draft platform-specific content from approved strategic context.

**Prompt Template:**
```
Generate {PLATFORM} content based on:

Strategic Context:
{STRATEGY_JSON}  # From approved_concepts.strategyContext

Content Package:
{CONTENT_PACKAGE}  # approved_concepts.contentPackage

Brand Voice:
{BRAND_GUIDELINES}  # From policy.toneGuidelines

Platform Specifics:
{PLATFORM} channel: {CHARACTER_LIMIT}, {MEDIA_REQUIREMENTS}, {AUDIENCE_TONE}
- Twitter/X: 280 chars, 1-4 images, witty/newsy tone
- LinkedIn: 1300 chars, 1 image, thought-leadership/professional
- Instagram: 2200 chars, 1 video, visual-first, authentic/lifestyle
- Email: 200 chars subject + 500 char preview, CTA-focused
- TikTok: 150 char caption, 15-60 sec video, trend-aware/entertaining
- Blog: 1500-3000 chars, multiple images/videos, long-form value

Task:
1. Draft 3 variations of {PLATFORM} content
2. For each: include visual description (image/video prompt for design team)
3. For each: suggest optimal posting time (based on audience_orient from platform_accounts)
4. For each: include 3 hashtags or CTA
5. Rate each variation for:
   - Brand alignment (1-10)
   - Estimated engagement potential (1-10)
   - Compliance risk (low/medium/high)

Output: Markdown with Variation 1/2/3, ratings, and ready-to-publish copy.
```

## Governance Evaluation

**Context:** Compliance team needs AI to evaluate content against hard rules before publishing.

**Prompt Template:**
```
Evaluate this content for governance compliance:

Content:
{CONTENT_COPY}

Hard Rules (this department):
{HARD_RULES_JSONB}

Policies:
{POLICIES_JSONB}

Compliance Checks:
1. Tone check: Does copy match brand voice per policy.toneGuidelines?
   - Flag deviations (too casual, too technical, inconsistent terminology)

2. Policy gate check: Does content violate any policy parameter?
   - content_cadence: Is this 1st post today? (max posts/day check)
   - fatigue_limit: Audience has seen >N similar messages this week?
   - budget_cap: Post budget exceeds remaining month budget?

3. Hard rule triggers:
   - Does content mention {restricted_terms}?
   - Does content require legal review (compliance keyword check)?
   - Approval authority needed? (risk_threshold vs severity)

4. Risk scoring:
   - Content risk level: low/medium/high/critical
   - Confidence: % certainty in rating
   - If medium+: escalation path (who must approve?)

5. Recommendation:
   - Status: proceed / require_edit / require_approval / blocked
   - Rationale: [brief explanation]
   - Required edits (if any): [specific suggestions]

Output: JSON with status, risks, escalation chain, and recommended reviewers.
```

## Risk Assessment (Misinformation/Compliance)

**Context:** Risk team evaluates content for misinformation, claim accuracy, and regulatory compliance.

**Prompt Template:**
```
Assess risk profile for this content:

Content:
{CONTENT_COPY}

Supporting Evidence:
{LEARNING_ENTRIES}  # Past validated claims from learning loop
{INSIGHT_EMBEDDINGS}  # Research context

Domain-Specific Risks:
- Fintech: Make no earnings claims (regulatory), avoid "guaranteed" language
- Web3: Disclose token ownership, avoid "investment opportunity" without disclaimer
- General: No health claims (FDA), no unsubstantiated statistics

Task:
1. Identify all factual claims in content
2. For each claim:
   - Is it supported by {LEARNING_ENTRIES} / {INSIGHTS}?
   - Confidence: high/medium/low/unsupported
   - Regulatory risk: none/minor/moderate/critical

3. Compliance red flags:
   - Unqualified health/financial/legal claims? → CRITICAL
   - Missing disclosures (partnerships, sponsorships)? → MODERATE
   - Outdated statistics (>6mo old)? → MINOR
   - Tone too aggressive/alarmist? → MINOR

4. Misinformation check:
   - Does claim conflict with established facts?
   - Is claim oversimplified (loses nuance)?

5. Recommendation:
   - Overall risk: low/medium/high/critical
   - Escalation: none / require_edit / require_approval / blocked

Output: Detailed risk report with claim-by-claim breakdown.
```

## SWOT Analysis Generation

**Context:** Strategy team needs AI to generate SWOT based on current market signals and historical performance.

**Prompt Template:**
```
Generate updated SWOT analysis:

Market Signals:
{INSIGHT_EMBEDDINGS}  # Recent scraped insights, trends, mentions
{REPUTATION_SNAPSHOTS}  # Social listening data
{STRATEGIC_SIGNALS}  # Escalated signals from research

Historical Data:
{OUTCOME_LOG}  # Past campaign performance (reach, engagement, sentiment)
{LEARNING_ENTRIES}  # What worked / didn't work

Task:

Strengths:
- Identify 5-7 internal capabilities from {LEARNING_ENTRIES}
- Rate confidence (high/medium/low) based on outcome frequency
- Source evidence: reference learning entries + past outcomes

Weaknesses:
- Identify 5-7 capability gaps or content weaknesses
- Flag areas where we underperformed competitors
- Source: outcome log (low engagement campaigns)

Opportunities:
- Identify emerging trends from {INSIGHT_EMBEDDINGS}
- Link to market demand (e.g., "20 LinkedIn posts about fintech Web3 in past week")
- Suggest content angles we haven't explored

Threats:
- Competitive moves, regulatory changes, negative sentiment spikes
- Source: reputation_snapshots sentiment trends, press coverage

Output: SWOT matrix in Markdown table format, with confidence scores and evidence links.
```

## Insight Extraction from Research

**Context:** Research team needs AI to extract actionable signals from raw web scraping/monitoring data.

**Prompt Template:**
```
Extract insights from raw research data:

Raw Data:
{SOCIAL_POSTS}  # Instagram/LinkedIn posts
{NEWS_ARTICLES}  # Press coverage
{REPUTATION_SNAPSHOTS}  # Mentions from monitoring

Schema: {insight_embeddings table}

For each data source:
1. Entity recognition:
   - Companies, products, people, trends mentioned?

2. Claim extraction:
   - What are key claims? (e.g., "Our competitor raised $50M")
   - Assess credibility (official announcement vs. rumor)

3. Sentiment analysis:
   - Topic sentiment: positive/neutral/negative
   - Emotion: excitement, concern, skepticism, trust?

4. Relevance scoring:
   - Does this insight apply to our business? (1-10)
   - Which department should care? (mkt, cs, comm, supp)

5. Trend detection:
   - First mention of this trend? Or recurring?
   - Trend trajectory: emerging / stable / declining?

6. Signal generation:
   - Is this insight important enough to escalate?
   - Suggested severity: freeze/pause/require_approval/notify/log

Output: insight_embeddings entry with:
- sourceUrl, contentChunk, detected_trend, claimHash
- domainRelevancyScore, departmentTags
- confidence_level, imARunId
```

## PR Press Coverage Analysis

**Context:** Communications team evaluates press coverage for brand alignment and risk.

**Prompt Template:**
```
Analyze press coverage:

Press Article:
{PR_NEWS_ARTICLE}  # From pr_news_articles table

Our Brand Context:
{BRAND_MESSAGING}
{PREVIOUS_COVERAGE}  # Historical pattern

Task:
1. Coverage quality:
   - Outlet tier: 1 (Forbes, WSJ) / 2 (Industry pubs) / 3 (blogs)
   - Coverage type: earned (merit), paid (sponsored), owned (self-published)
   - Tone toward company: positive/neutral/negative

2. Key claims (ours vs outlet):
   - What did journalist claim about us?
   - Accurate vs. our messaging? (flag discrepancies)
   - Any inaccuracies needing correction?

3. Stakeholder impact:
   - Quoted us? Which executive?
   - Quoted competitors? Who won the narrative?
   - Customer sentiment in comments?

4. Strategic alignment:
   - Coverage aligns with our approved messaging? (yes/partial/no)
   - Helps or hurts our strategic positioning?
   - Missed narrative? (what should we have emphasized?)

5. Recommendation:
   - Amplify (share on our channels)?
   - Issue correction? (specify inaccuracy + correction)
   - Media follow-up pitch? (e.g., exclusive interview offer)
   - Risk assessment: low/medium/high

Output: PR analysis with recommendations for next steps.
```

---

## References

- NEXOS (all schema files, n8n workflows, content generation, governance, RAG patterns)
- bifrost-framework (governance policy engine, risk scoring)
