# Primus IDP AI Agent Instructions

## Project Overview
Primus IDP is a self-hosted AI research assistant with Retrieval-Augmented Generation (RAG) capabilities. It integrates personal knowledge bases with external sources like Slack, Notion, GitHub, and more. The architecture includes a FastAPI backend, Next.js frontend, PostgreSQL+pgvector, Redis+Celery, and a browser extension.

## Core Architecture Patterns

### Port Configuration
- **All services MUST use ports 8000-8999**:
  - Backend: 8000 (`UVICORN_PORT` in `primus_idp_backend/app/config/uvicorn.py`)
  - Frontend: 8001 (`NEXT_PUBLIC_FASTAPI_BACKEND_URL` in `primus_idp_web/.env`)
  - Database: 5432 (Docker), Redis: 6379, pgAdmin: 5050

### Multi-Service Stack
```
primus_idp_backend/      # FastAPI + Celery workers + LangGraph agents
primus_idp_web/          # Next.js + React + TypeScript
primus_idp_browser_extension/  # Plasmo framework (Manifest v3)
```

### LangGraph Agent Architecture
- **Agents live in**: `primus_idp_backend/app/agents/{podcaster,researcher}/`
- **Structure**: Each agent has `graph.py` (StateGraph), `nodes.py` (node functions), `state.py` (TypedDict state), `configuration.py`
- **Researcher agent**: Conditional routing based on `ResearchMode` (QNA vs full report). Sub-agents in `qna_agent/`
- **Streaming**: Agents stream via `astream()` with updates yielded to the frontend

### Backend API Patterns
- **Routes**: All under `/api/v1/` (`app/routes/*_routes.py`)
- **Authentication**: FastAPI Users with JWT (`primus_idp_bearer_token` in localStorage)
- **Database**: SQLAlchemy async sessions (`get_async_session()` dependency)
- **User isolation**: Filter queries by `user_id`

### Frontend API Integration
- **API client**: `primus_idp_web/lib/api.ts` (`fetchWithAuth()` and `apiClient`)
- **React hooks**: API calls in `primus_idp_web/hooks/use-*.ts`
- **Streaming chat**: Vercel AI SDK's `useChat()` hook

### RAG & Embeddings Pipeline
- **Chunking**: `RecursiveChunker` and `CodeChunker` in `primus_idp_backend/app/config/__init__.py`
- **Embeddings**: `AutoEmbeddings.get_embeddings(EMBEDDING_MODEL)`
- **Hybrid search**: Vector similarity + full-text search (`documents_hybrid_search.py`)
- **Rerankers**: Configured via `RERANKERS_MODEL_NAME` and `RERANKERS_MODEL_TYPE`

### Celery Task System
- **Worker startup**: `primus_idp_backend/celery_worker.py`
- **Task definitions**: `primus_idp_backend/app/tasks/celery_tasks/*_tasks.py`
- **Connector indexing**: `app/tasks/connector_indexers/{connector}_indexer.py`
- **Document processing**: `app/tasks/document_processors/file_processors.py`

### Database Migrations
- **Alembic**: Migrations in `primus_idp_backend/alembic/versions/*.py`
- **Run migrations**: `cd primus_idp_backend && alembic upgrade head`
- **Generate migration**: `alembic revision --autogenerate -m "description"`

## Development Workflow

### Starting Services
```powershell
# 1. Start database
docker start primus-idp-db-1

# 2. Start backend
cd primus_idp_backend
& c:\Users\Akki\PrimusIDP\.venv\Scripts\python.exe main.py --reload

# 3. Start frontend
cd primus_idp_web
npm run dev

# 4. (Optional) Start Celery worker
celery -A app.celery_app worker --loglevel=info --concurrency=1 --pool=solo
```

### Python Environment
- **Virtual env**: `.venv/` at project root
- **Activation**: `. .venv/Scripts/Activate.ps1`
- **Dependencies**: Managed via `pyproject.toml`

### Frontend Development
- **Package manager**: pnpm
- **Dev server**: Next.js with Turbopack (`--turbopack` flag)
- **UI components**: Tailwind CSS + Shadcn components

## Critical Code Patterns

### Adding a New Backend Route
1. Create route file: `primus_idp_backend/app/routes/new_feature_routes.py`
2. Define router: `router = APIRouter()`
3. Include in app: Add to `app/app.py`
4. Use dependencies: `user: User = Depends(current_active_user)`

### Adding a New Connector
1. Add enum to `app/db.py`
2. Create Alembic migration
3. Implement indexer: `app/tasks/connector_indexers/new_connector_indexer.py`
4. Add OAuth routes (if needed)
5. Frontend: Create connector page

## Common Issues & Solutions

### Frontend Not Connecting to Backend
- **Check**: `NEXT_PUBLIC_FASTAPI_BACKEND_URL` matches backend port
- **Verify**: Backend accessible at `http://localhost:8000/docs`

### Database Connection Errors
- **Ensure**: Docker container `primus-idp-db-1` is running
- **Start**: `docker start primus-idp-db-1`

### Celery Tasks Not Processing
- **Worker running?**: Check with `celery -A app.celery_app inspect active`
- **Redis connection**: Verify `CELERY_BROKER_URL`

## Key Files Reference
- Backend config: `primus_idp_backend/app/config/__init__.py`
- Frontend API client: `primus_idp_web/lib/api.ts`
- Agent graphs: `primus_idp_backend/app/agents/*/graph.py`

## External Documentation
- [Installation Guide](https://www.primusidp.net/docs/)
- [GitHub Roadmap](https://github.com/users/khanakkijpr-dot/projects/2)
- [Discord Community](https://discord.gg/ejRNvftDp9)
