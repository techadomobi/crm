# OffersMeta CRM Dashboard (Live API)

This project is wired to use real data from your OffersMeta API docs and routes all frontend API calls through a Node.js/Express proxy.

## What Was Added

- API catalog generated from your live Swagger docs: `API_CATALOG.md`
- New backend proxy server in `server/`
- Frontend Axios client with typed errors in `project/src/lib/apiClient.ts`
- React Query hooks per CRM module in `project/src/hooks/`
- Zustand global store in `project/src/store/appStore.ts`
- Typed CRM models in `project/src/types/crm.ts`
- Module service files in `project/src/services/`
- Live dashboard page consuming proxy data in `project/src/pages/Dashboard.tsx`

## Setup

1. Install backend dependencies:
   - `cd server`
   - `npm install`
2. Create backend env:
   - Copy `server/.env.example` to `server/.env`
   - Fill `CRM_BEARER_TOKEN` (or OAuth variables if you switch auth mode)
3. Start backend:
   - `npm run dev`
4. Install frontend dependencies:
   - `cd project`
   - `npm install`
5. Create frontend env:
   - Copy `project/.env.example` to `project/.env`
   - Set `VITE_PROXY_BASE_URL` if needed
6. Start frontend:
   - `npm run dev`

## Required Env Vars

Backend (`server/.env`):
- `PORT`
- `CRM_API_BASE_URL`
- `CRM_AUTH_MODE`
- `CRM_BEARER_TOKEN`
- Optional OAuth2:
  - `OAUTH_TOKEN_URL`
  - `OAUTH_CLIENT_ID`
  - `OAUTH_CLIENT_SECRET`
  - `OAUTH_SCOPE`
- Optional:
  - `CRM_PARTNERS_ID`
  - `FRONTEND_ORIGIN`

Frontend (`project/.env`):
- `VITE_PROXY_BASE_URL`
- `VITE_API_BASE_URL`

## Add A New API Module

1. Create a backend route file in `server/routes/<module>.js`.
2. Register it in `server/routes/index.js`.
3. Create frontend service in `project/src/services/<module>.ts`.
4. Create hook in `project/src/hooks/use<Module>.ts`.
5. Add/update corresponding TypeScript types in `project/src/types/crm.ts`.
6. Build page/component using the hook.

## Notes

- Auth method detected from docs: Bearer token via `Authorization` header.
- OAuth2 refresh is implemented as an optional mode in backend auth middleware.
- Some requested CRM modules are mapped to nearest available endpoints because the docs are primarily tracking/affiliate APIs.
