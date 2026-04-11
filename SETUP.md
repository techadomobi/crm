# 📋 Full Setup & Quick Start Guide

## What This Is
Production-ready CRM with role-aware authentication (Admin/Advertiser/Publisher), live API integration, and no configuration needed for basic use.

---

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd project
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Opens at `http://localhost:5174`

### 3. Test Auth Flow
- Open http://localhost:5174
- Register with new email or login
- Select account type: Admin, Advertiser, or Publisher
- Enter credentials and submit

### 4. Try API Workbench
- Navigate to API Docs (left sidebar)
- Save your token in "Session Context"
- Run smoke tests or bulk API runner
- Export results as CSV

---

## Project Structure

```
project/
├── src/
│   ├── pages/              # CRM module pages
│   │   ├── Dashboard.tsx   # Main stats & charts
│   │   ├── Contacts.tsx    # Publishers & advertisers
│   │   ├── Deals.tsx       # Offers management
│   │   ├── Activities.tsx  # Conversion feed
│   │   ├── Reports.tsx     # Report generation
│   │   ├── ApiDocs.tsx     # API testing workbench
│   │   ├── AuthPortal.tsx  # Login/register UI
│   │   └── Settings.tsx    # User preferences
│   ├── components/         # Reusable UI components
│   │   ├── Sidebar.tsx     # Navigation menu
│   │   ├── Header.tsx      # Top bar
│   │   ├── StatsCard.tsx   # Stat display
│   │   └── RevenueChart.tsx# Chart component
│   ├── api/                # API client & hooks
│   │   ├── httpClient.ts   # Fetch wrapper + auth
│   │   ├── repowireApi.ts  # OffersMeta v2 routes
│   │   ├── liveDataAdapters.ts # Data transformation
│   │   └── smokeTests.ts   # Endpoint health checks
│   ├── types/              # TypeScript types
│   ├── data/               # Mock data
│   ├── App.tsx             # Root component + auth
│   └── main.tsx            # Entry point
├── dist/                   # Production build (after npm run build)
├── package.json            # Dependencies
├── vite.config.ts          # Build config
├── tsconfig.json           # TypeScript config
└── tailwind.config.js      # Styling config
```

---

## Key Features

### ✅ Authentication
- **Three Account Types**: Admin (via partner ID), Advertiser, Publisher
- **Multiple Login Routes**: /admin/login, /subAdmin/singleLogin, /publicher/login, /advertiser/login
- **Auto-Token Injection**: JWT automatically added to all API requests
- **Session Persistence**: Token saved in localStorage, session survives refresh

### ✅ CRM Modules
- **Dashboard**: Real-time stats (conversions, payouts, revenue)
- **Contacts**: Publisher & advertiser lists with search
- **Deals**: Offer management with live data
- **Activities**: Conversion event timeline
- **Reports**: Custom report generation
- **Settings**: User preferences & session management

### ✅ API Integration
- **16+ Endpoints Wired**: All critical APIs integrated
- **React Query Caching**: Auto-refetch, cache invalidation
- **Error Handling**: HTTP-status-aware error messages
- **Live Testing**: API Docs page with smoke tests + bulk runner

### ✅ Developer Tools
- **API Docs Workbench**: Test all endpoints from UI
- **Bulk API Runner**: Run multiple endpoints with templates
- **CSV Export**: Download test results
- **Category Filtering**: Group endpoints by type
- **Endpoint Templates**: Custom query/body per endpoint

---

## Environment Setup

### Default Configuration
No secrets required for dev:
- API Base: `https://apiv2.offersmeta.in` (public)
- Proxy: Optional local Node proxy (auto-fallback to direct)

### To Add Custom API Base
Create `.env.local` in `project/` folder:
```env
VITE_API_BASE_URL=https://your-custom-api.com
# OR (if running local proxy)
VITE_PROXY_BASE_URL=http://localhost:4000/api
```

---

## Development Commands

```bash
# Start dev server (port 5174, hot reload)
npm run dev

# Type checking
npm run typecheck

# Linting & format check
npm run lint

# Build production bundle
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

---

## Authentication Schema

### Login Flow
```
User selects account type (Admin/Advertiser/Publisher)
↓
Enters email + password (+optional partners_Id)
↓
App tries multiple endpoints per role
↓
Success: Extract JWT token
↓
Store token in localStorage
↓
Inject token into all API requests
↓
Redirect to Dashboard
```

### Supported Account Types
1. **Admin** → Routes to `/subAdmin/singleLogin` (primary), `/subAdmin/login`, `/admin/login`
2. **Advertiser** → Routes to `/advertiser/login`
3. **Publisher** → Routes to `/publicher/login`

### Token Caching
- Stored in `localStorage['repowire_token']`
- Automatically injected as `Authorization: Bearer <token>`
- Persists across browser refresh
- Cleared on logout/session expire

---

## API Integration Points

### Authenticated Endpoints (Require JWT)
```
GET  /conversion/ConversionList    → Dashboard conversions
GET  /conversion/totalConversion   → Total conversion count
GET  /conversion/totalPayout       → Total payout $$$
GET  /conversion/totalRevenue      → Total revenue $$$
GET  /publicher/publisherList      → Contacts (publishers)
GET  /advertiser/advertiserList    → Contacts (advertisers)
GET  /offer/offerList              → Deals (offers)
```

### Public Endpoints (No Auth)
```
GET  /user/countrylist             → Country dropdown
GET  /admin/planList               → Plan list
GET  /admin/notificationApi        → Notifications
POST /subAdmin/singleLogin         → Admin login
POST /subAdmin/login               → Advertiser login
POST /publicher/login              → Publisher login
POST /advertiser/login             → Advertiser login
```

---

## Test Credentials

### For Testing
**Note:** Use your own credentials from OffersMeta backend or ask admin for test accounts.

Common test patterns:
- **Email**: test+any-suffix@example.com
- **Password**: Minimum 6 characters
- **Partners ID**: 74 (if using partner mode)

### Error Messages
- `Domain already exists` → Email already registered
- `User not found` → Credentials don't match backend
- `Invalid credentials` → Wrong password or email
- `HTTP 502` → Backend service unavailable

---

## Troubleshooting

### Issue: "Invalid credentials" on login
**Solution:**
1. Verify email/password are correct
2. Check if account type selected matches backend account type
3. If Admin, ensure partners_Id is provided
4. Try registering new account instead

### Issue: "Cannot read property 'token' of undefined"
**Solution:**
1. Ensure auth endpoint is responding (check /api/docs)
2. Verify backend is alive: https://apiv2.offersmeta.in/admin/notificationApi
3. Check browser DevTools → Network tab for failed requests

### Issue: Dashboard shows "Loading..." forever
**Solution:**
1. Check if token is valid (DevTools → LocalStorage)
2. Try clicking Dashboard in sidebar again
3. Check API response in DevTools → Network tab
4. If 401/403, re-login to refresh token

### Issue: API Docs page shows "No APIs detected"
**Solution:**
1. Paste endpoints in format: `METHOD /path` (one per line)
2. Example: `GET /offer/offerList`
3. Click "Run N APIs" button
4. Check Network tab for actual HTTP responses

---

## Performance Tips

1. **First Load**
   - React 18 with Vite = ~2-3s load time
   - Modules lazy-load on navigation

2. **API Calls**
   - React Query auto-caches responses
   - Refetch on window focus (configurable)
   - Stale data invalidates after 5 minutes

3. **Bundle Size**
   - Original: 384KB (before gzip)
   - Production: 110KB (after gzip)
   - Modern browsers unzip automatically

---

## Next Steps

1. **Get Backend Credentials**
   - Contact OffersMeta admin
   - Obtain test email/password for your role

2. **Test Auth Flow**
   - Navigate to http://localhost:5174
   - Login with credentials
   - Verify token appears in localStorage

3. **Explore API Workbench**
   - Go to /api/docs
   - Save token and partners_Id
   - Run smoke tests to verify backend

4. **Test CRM Modules**
   - Dashboard → Check live stats
   - Contacts → Load publisher list
   - Deals → Load offers
   - Reports → Generate report

5. **Deploy to Production**
   - See [DEPLOYMENT.md](DEPLOYMENT.md)
   - Configure environment variables
   - Run `npm run build`
   - Deploy `dist/` folder

---

## Support

For issues:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check browser DevTools (F12) → Console & Network tabs
3. Verify backend is responding: https://apiv2.offersmeta.in/admin/notificationApi
4. Check API response format in /api/docs workbench

---

**Project Ready:** ✅ Production Build Passing | ✅ TypeScript Clean | ✅ ESLint Passing  
**Backend:** OffersMeta v2 (apiv2.offersmeta.in)  
**Tech Stack:** React 18 + TypeScript + Vite + TailwindCSS + React Query  
**Status:** READY FOR DEPLOYMENT
