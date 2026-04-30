# Content & AI Domain: Data Schemas

## Core Enums

```sql
CREATE TYPE departmentEnum AS ENUM (
  'global', 'mkt', 'cs', 'comm', 'supp'
);

CREATE TYPE roleEnum AS ENUM (
  'system_executive', 'platform_admin', 'dept_director',
  'dept_manager', 'dept_viewer', 'service_account'
);

CREATE TYPE severityEnum AS ENUM (
  'freeze', 'pause', 'require_approval', 'notify', 'log'
);

CREATE TYPE documentTypeEnum AS ENUM (
  'company', 'strategy', 'policy', 'segmentation',
  'offer', 'compliance', 'learning', 'best_practice'
);

CREATE TYPE policyTypeEnum AS ENUM (
  'risk_threshold', 'budget_cap', 'autonomy_limit',
  'content_cadence', 'fatigue_limit', 'generative_policy'
);

CREATE TYPE riskLevelEnum AS ENUM (
  'low', 'medium', 'high', 'critical'
);

CREATE TYPE approvalStatusEnum AS ENUM (
  'pending', 'pending_review', 'approved',
  'rejected', 'published', 'processed', 'drafted'
);

CREATE TYPE platformEnum AS ENUM (
  'twitter', 'linkedin', 'email', 'social', 'x',
  'telegram', 'instagram', 'youtube', 'coinmarketcap', 'tiktok', 'blog'
);

CREATE TYPE contentTypeEnum AS ENUM (
  'social_post', 'b2b_proposal', 'image', 'video'
);

CREATE TYPE eventTypeEnum AS ENUM (
  'generation', 'governance_block', 'system_error',
  'agent_signal', 'learning', 'governance_escalation'
);

CREATE TYPE triggerTypeEnum AS ENUM (
  'system', 'user', 'webhook', 'cron', 'learning',
  'generation', 'governance_escalation'
);

CREATE TYPE leadStatusEnum AS ENUM (
  'new', 'enriched', 'actioned'
);

CREATE TYPE commandStatusEnum AS ENUM (
  'pending', 'routed', 'executed', 'rejected'
);
```

## Core Content Tables

### `campaign_assets`

```sql
CREATE TABLE campaign_assets (
  assetId UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  targetSegment VARCHAR,
  contentBody TEXT NOT NULL,
  status approvalStatusEnum,
  conceptId UUID,
  platform platformEnum,
  governanceNotes TEXT,
  promptRaw TEXT,
  retryCount INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (conceptId) REFERENCES approved_concepts(conceptId),
  INDEX (departmentId),
  INDEX (status)
);
```

### `approved_concepts`

```sql
CREATE TABLE approved_concepts (
  conceptId UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  status approvalStatusEnum,
  deliveryTarget VARCHAR,
  platformPostId VARCHAR,
  originalContent TEXT,
  humanEditedText TEXT,
  inspiredByInsightId UUID,
  tenantId UUID,
  accountId UUID,
  targetSegment VARCHAR,
  platform platformEnum,
  strategyContext JSONB,      -- {market_position, key_messages, target_outcome}
  contentPackage JSONB,       -- {visual_style, tone, cta, hashtags}
  governanceConcerns TEXT,
  complianceScore DECIMAL(3,2),  -- 0.0-1.0
  rubricScore DECIMAL(3,2),
  similarityScore DECIMAL(3,2),  -- vs. brand templates
  FOREIGN KEY (inspiredByInsightId) REFERENCES insight_embeddings(id),
  INDEX (departmentId),
  INDEX (status),
  INDEX (platform)
);
```

## Intelligence & Vector Embeddings

### `content_memory_embeddings`

```sql
CREATE TABLE content_memory_embeddings (
  id UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1024),  -- pgvector: Cohere Embed v3
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (departmentId) REFERENCES department_registry(departmentId),
  INDEX USING hnsw (embedding vector_cosine_ops)
);
```

### `insight_embeddings`

```sql
CREATE TABLE insight_embeddings (
  id UUID PRIMARY KEY,
  sourceUrl VARCHAR,
  contentChunk TEXT NOT NULL,
  embedding vector(1024),  -- Cohere Embed v3
  domainRelevancyScore DECIMAL(3,2),  -- 0.0-1.0
  departmentTags JSONB,     -- ['mkt', 'cs', ...]
  topic VARCHAR,
  claimHash VARCHAR UNIQUE,  -- MD5(claim) for dedup
  source_type VARCHAR,       -- 'twitter', 'linkedin', 'news', 'web'
  detected_trend VARCHAR,    -- 'emerging', 'stable', 'declining'
  imARunId UUID,             -- Links to orchestrator_run_logs
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX USING hnsw (embedding vector_cosine_ops),
  INDEX (claimHash),
  INDEX (departmentTags),
  INDEX (imARunId)
);
```

## Strategic Analysis

### `strategic_signals`

```sql
CREATE TABLE strategic_signals (
  id UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  sourceInsightId UUID NOT NULL,
  signalType VARCHAR,  -- 'market_opportunity', 'competitive_threat', 'risk_flag'
  severity severityEnum,
  confidence DECIMAL(3,2),  -- 0.0-1.0
  summary TEXT,
  executiveBrief TEXT,
  imARunId UUID,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (sourceInsightId) REFERENCES insight_embeddings(id),
  INDEX (departmentId),
  INDEX (severity)
);
```

### `swot_state`

```sql
CREATE TABLE swot_state (
  id UUID PRIMARY KEY,
  tenantId UUID NOT NULL,
  category ENUM('strength', 'weakness', 'opportunity', 'threat'),
  content TEXT NOT NULL,
  confidenceScore DECIMAL(3,2),
  sourceInsightId UUID,
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (sourceInsightId) REFERENCES insight_embeddings(id),
  INDEX (tenantId),
  INDEX (category)
);
```

## Reputation & Social Listening

### `reputation_snapshots`

```sql
CREATE TABLE reputation_snapshots (
  id UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  sourcePlatform platformEnum,
  rawFeedback TEXT,  -- User comment/mention
  caption TEXT,      -- Original post content
  sentimentScore DECIMAL(3,2),  -- -1.0 to 1.0
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX (departmentId),
  INDEX (sentimentScore)
);
```

### `reputation_risk_signals`

```sql
CREATE TABLE reputation_risk_signals (
  id UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  sourceManager VARCHAR,  -- Who detected this
  riskCategory VARCHAR,   -- 'brand_attack', 'product_complaint', 'exec_criticism'
  severity severityEnum,
  active BOOLEAN DEFAULT true,
  summary TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX (departmentId),
  INDEX (severity)
);
```

## Cost & Usage Tracking

### `cost_log`

```sql
CREATE TABLE cost_log (
  id UUID PRIMARY KEY,
  jobId UUID,
  departmentId VARCHAR NOT NULL,
  modelId VARCHAR,  -- 'claude-opus-4-7', 'cohere-embed-v3', 'vertex-ai'
  promptTokens INTEGER,
  completionTokens INTEGER,
  totalUsd DECIMAL(12,8),
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX (departmentId),
  INDEX (modelId),
  INDEX (createdAt)
);
```

### `agent_config`

```sql
CREATE TABLE agent_config (
  id UUID PRIMARY KEY,
  agentName VARCHAR UNIQUE NOT NULL,
  modelId VARCHAR,  -- 'claude-opus-4-7'
  maxTokens INTEGER,
  costPerPromptToken DECIMAL(12,10),     -- $ per 1M tokens
  costPerCompletionToken DECIMAL(12,10),
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## Learning & Knowledge

### `learning_entries`

```sql
CREATE TABLE learning_entries (
  learningId UUID PRIMARY KEY,
  tenantId UUID NOT NULL,
  conclusion TEXT NOT NULL,      -- "LinkedIn posts with 3+ hashtags get 2.5x engagement"
  confidenceLevel VARCHAR,        -- 'high', 'medium', 'low'
  domain VARCHAR,                 -- 'linkedin_tactics', 'content_tone', 'campaign_timing'
  supportingOutcomeIds UUID[],    -- Array of outcome_log IDs
  embedding vector(1024),         -- For semantic search
  supersededBy UUID,              -- Self-reference: prior version
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX USING hnsw (embedding vector_cosine_ops),
  INDEX (domain)
);
```

## PR & Media Monitoring

### `pr_news_articles`

```sql
CREATE TABLE pr_news_articles (
  id UUID PRIMARY KEY,
  tenantId UUID,
  coverageUrl VARCHAR UNIQUE NOT NULL,
  outletName VARCHAR,
  outletTier VARCHAR,  -- 'tier1', 'tier2', 'tier3'
  businessSegment VARCHAR,
  coverageType VARCHAR,  -- 'earned', 'paid', 'owned'
  triggeredBy VARCHAR,   -- What triggered coverage (product launch, funding, etc.)
  wibxMentionedHow VARCHAR,  -- Positive/neutral/negative context
  sentiment VARCHAR,  -- 'positive', 'neutral', 'negative'
  publishedAt TIMESTAMP,
  journalistName VARCHAR,
  language VARCHAR,  -- 'pt-br', 'en'
  headline VARCHAR NOT NULL,
  summary TEXT,
  keyClaims TEXT[],      -- Array of claims made
  entitiesMentioned TEXT[],
  quotedSpokespeople TEXT[],
  extractionConfidence DECIMAL(3,2),
  isRelevant BOOLEAN,
  isRemoved BOOLEAN DEFAULT false,
  removedAt TIMESTAMP,
  ingestedAt TIMESTAMP DEFAULT NOW(),
  INDEX (tenantId),
  INDEX (outletTier),
  INDEX (sentiment),
  INDEX (publishedAt)
);
```

### `pr_generated_content`

```sql
CREATE TABLE pr_generated_content (
  id UUID PRIMARY KEY,
  tenantId UUID,
  milestoneHeadline VARCHAR,
  milestoneContext TEXT,
  targetOutlet VARCHAR,  -- Outlet we're pitching to
  headline VARCHAR NOT NULL,
  subheading VARCHAR,
  originalContent TEXT,
  targetSegment VARCHAR,
  strategicContext TEXT,
  approvalStatus approvalStatusEnum,
  approvedBy UUID,
  approvedAt TIMESTAMP,
  modelUsed VARCHAR DEFAULT 'claude-opus-4-7',
  temperature DECIMAL(3,2) DEFAULT 0.2,
  tokensUsed INTEGER,
  generationTimeMs INTEGER,
  similarityScore DECIMAL(3,2),  -- vs. brand template library
  confidenceScore DECIMAL(3,2),
  INDEX (tenantId),
  INDEX (approvalStatus)
);
```

### `pr_settings`

```sql
CREATE TABLE pr_settings (
  id UUID PRIMARY KEY,
  tenantId UUID UNIQUE NOT NULL,
  searchTerms JSONB,  -- {company_names: [...], product_names: [...]}
  monitorSources TEXT[],  -- ['rss', 'news_api', 'twitter', 'reddit']
  searchFrequency VARCHAR,  -- 'hourly', 'daily', '4x_daily'
  lastSearchAt TIMESTAMP,
  toneGuidelines TEXT,
  outletBestPractices JSONB,  -- {tier1: "...", tier2: "..."}
  alwaysCheckSimilarity BOOLEAN DEFAULT true,
  similarityThreshold DECIMAL(3,2) DEFAULT 0.75,
  modelId VARCHAR DEFAULT 'claude-opus-4-7',
  temperature DECIMAL(3,2) DEFAULT 0.2,
  maxTokens INTEGER DEFAULT 2048,
  articlesPerPage INTEGER DEFAULT 25,
  autoArchiveAfterDays INTEGER DEFAULT 90,
  INDEX (tenantId)
);
```

## Orchestration & Runtime

### `orchestrator_run_logs`

```sql
CREATE TABLE orchestrator_run_logs (
  runId UUID PRIMARY KEY,
  triggerType triggerTypeEnum,
  type eventTypeEnum,
  currentStage VARCHAR,  -- 'research', 'generation', 'governance', 'publishing'
  completionPercent INTEGER,  -- 0-100
  lastProgressAt TIMESTAMP,
  startedAt TIMESTAMP DEFAULT NOW(),
  completedAt TIMESTAMP,
  status VARCHAR,  -- 'running', 'success', 'error', 'paused'
  summary TEXT,
  INDEX (triggerType),
  INDEX (startedAt)
);
```

---

## References

- NEXOS (schema files: schema.ts, schema_pr.ts, schema_intelligence.ts, enums.ts)
- bifrost-framework (governance, policy patterns)
