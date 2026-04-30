# Project Structure Conventions

## BFF + Frontend Monorepo (Investigator Pattern)

```
project/
├── dashboard/                    # React/Vite frontend
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api/
│   │   └── components/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile
│   ├── .env.example
│   └── .env (git-ignored)
│
├── gateway/                      # Node BFF / API Gateway
│   ├── src/
│   │   ├── server.js            # Entry point
│   │   ├── app.js               # Express/Fastify app
│   │   ├── actionRouter.js       # Request routing
│   │   ├── middleware/
│   │   │   └── logger.js
│   │   └── queries/
│   │       ├── common.js
│   │       ├── rewards.js
│   │       ├── wallet.js
│   │       ├── transfer.js
│   │       ├── vip.js
│   │       └── delivery.js
│   ├── package.json
│   ├── Dockerfile
│   ├── .env.example
│   └── .env (git-ignored)
│
├── database_local_dev/           # Local Postgres
│   ├── docker-compose.yml
│   ├── init.sql
│   └── postgres_data/ (volume)
│
└── docker-compose.yml            # Orchestration
```

## Angular Monorepo (Bifrost Pattern)

```
project/
├── apps/                         # Application workspaces
│   ├── account/                  # Auth, user profile, onboarding, MFA
│   │   └── src/app/
│   ├── business/                 # Merchant/enterprise management
│   │   └── src/app/
│   ├── shopping/                 # E-commerce storefront
│   │   └── src/app/
│   └── tokengo/                  # Gamification platform
│       └── src/app/
│
├── libs/                         # Shared libraries
│   ├── commonlib/                # Reusable components, services, styles
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── styles/           # SCSS, color vars, fonts
│   │   │   └── index.ts
│   │   └── package.json
│   └── wallet/                   # Financial features
│       ├── src/
│       └── package.json
│
├── config/                       # Dev proxy configs, env utilities
├── scripts/                      # Postinstall automation
├── tools/                        # Nx workspace generators
├── patches/                      # patch-package patches
├── assets/                       # Global assets (icons, fonts)
├── .github/                      # CI workflows
│
├── nx.json
├── tsconfig.base.json
├── package.json
├── yarn.lock
└── .eslintrc.json

### Per-App Internal Structure
apps/{app}/src/app/
├── core/                         # Singletons (services, guards, stores)
│   ├── adapters/
│   ├── api/
│   ├── effects/                  # NgRx effects
│   ├── guards/                   # Route guards
│   ├── interceptors/             # HTTP interceptors
│   ├── resolvers/                # Route resolvers
│   ├── services/
│   └── stores/                   # NgRx actions, reducers, selectors
│
├── shared/                       # Presentation reusables
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   └── modules/
│
└── containers/                   # Smart/connected components
    └── {feature}/
        ├── {component}.component.ts
        └── {component}.component.html
```

## TypeScript Backend (NEXOS Pattern)

```
backend/
├── src/
│   ├── index.ts                  # Entry point
│   ├── db/
│   │   ├── schema.ts             # Main schema
│   │   ├── schema_bunker.ts      # Production/financial data
│   │   ├── schema_acos.ts        # Commercial
│   │   ├── schema_asos.ts        # Approvals
│   │   ├── schema_intelligence.ts
│   │   ├── schema_pr.ts          # PR/reputation
│   │   ├── enums.ts              # Postgres enums
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── routes/
│   ├── workers/
│   ├── services/
│   └── middleware/
│
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── Dockerfile
├── .env.example
├── .env (git-ignored)
├── test_*.ts                     # Root-level test scripts
├── trigger_*.ts                  # Workflow triggers
└── scripts/
    └── smoke_test.ts
```

## Next.js Frontend (NEXOS Pattern)

```
frontend/
├── src/
│   ├── app/                      # App Router (Next.js 13+)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── {routes}/
│   ├── components/
│   └── lib/
│
├── public/
├── next.config.ts
├── tsconfig.json
├── package.json
├── .env.local (git-ignored)
└── .eslintrc.json
```

## Automation Layer (NEXOS n8n)

```
project/
└── n8n/
    ├── M5_ContentGeneration.json
    ├── M3a1_InstagramScraping.json
    ├── M3a3_LinkedInScraping.json
    ├── ReputationManagement.json
    ├── DocumentSeeding.json
    ├── ApprovalPipeline.json
    ├── DiscordAlerts.json
    └── ... (20+ workflow JSON exports)
```

**Naming Pattern:** `{ModuleCode}_{Description}.json`

## Knowledge Base (Forge/Bifrost Pattern)

```
project/
├── knowledge/                    # Shared standards
│   ├── TECH_STACK.md
│   ├── NAMING_CONVENTIONS.md
│   ├── COMPONENT_LIBRARY.md
│   ├── GOTCHAS.md
│   └── FRONTEND_REPOSITORY_MANUAL.md
│
├── .bifrost/                     # Runtime state
│   ├── STATE.md
│   ├── PLAN.md
│   ├── QA_REPORT.md
│   └── METRICS.json
│
└── docs/                         # Human-readable guides
    ├── ARCHITECTURE.md
    ├── DEVELOPMENT.md
    ├── OPERATIONS_MANUAL.md
    └── ...
```

## Static Tools (Finesta Pattern)

**Single self-contained HTML file:**
- Zero dependencies (all via CDN)
- Client-side processing only
- No build step required
- External libraries: SheetJS (Excel export)

```
project/
├── Finesta.html          # Complete app in one file
├── README.md
└── .gitignore
```

## Godot Game Project (Wibx-Runner Pattern)

```
project/
├── project.godot         # Godot project root
├── export_presets.cfg    # Export targets (Android, Web)
│
├── scenes/               # Game scenes
│   ├── main/
│   │   └── Main.tscn
│   ├── player/
│   │   └── Player.tscn
│   ├── obstacles/
│   │   ├── ObstacleA.tscn
│   │   ├── ObstacleB.tscn
│   │   └── ObstacleC.tscn
│   ├── collectibles/
│   │   └── Coin.tscn
│   ├── powerups/
│   │   └── PowerUp.tscn
│   ├── antagonist/
│   │   └── Inspector.tscn
│   └── ui/
│       ├── HUD.tscn
│       ├── MainMenu.tscn
│       ├── PauseMenu.tscn
│       ├── TallyScreen.tscn
│       ├── SaveMeScreen.tscn
│       ├── DebugOverlay.tscn
│       └── MockVideoAd.tscn
│
├── data/
│   └── mock_wallet.json  # Game state persistence
│
├── docs/
│   ├── overview.md
│   ├── design_direction.md
│   ├── technical_document.md
│   ├── research.md
│   └── DEVELOPMENT_PLAN.md
│
└── (versioned builds: v5/, v6/, v7/, v8/, v9/)
```

---

## References

- investigator (BFF+frontend pattern)
- bifrost-framework (monorepo, per-app structure)
- NEXOS (TypeScript backend, schema organization)
- finesta (static HTML tool)
- wibx-runner (Godot scenes, data persistence)
