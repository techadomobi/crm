# API Integration Guide - OffersMeta CRM Dashboard

## Current Status

✅ **All APIs are properly integrated with the UI** - The frontend is fully wired to fetch and display real data from the OffersMeta API.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────┐
│   React Frontend │───▶│  Node.js Proxy  │───▶│ OffersMeta API      │
│   (Port 5173)    │◀───│  (Port 4000)    │◀───│ (apiv2.offersmeta.in)│
└─────────────────┘    └─────────────────┘    └─────────────────────┘
```

## How Data Flows

1. **User logs in** → AuthPortal.tsx handles authentication
2. **Token stored** → localStorage ('repowire_token')
3. **API calls** → httpClient.ts auto-injects token
4. **Proxy server** → Forwards requests to OffersMeta API
5. **Data adapters** → Transform API responses to UI models
6. **React components** → Display real data

## Key Files

### Frontend API Layer
- `project/src/api/httpClient.ts` - HTTP client with auth injection
- `project/src/api/repowireApi.ts` - API endpoint definitions
- `project/src/api/liveDataAdapters.ts` - Data transformation layer

### Backend Proxy
- `server/server.js` - Express server entry point
- `server/routes/` - Route handlers for each module
- `server/utils/proxy.js` - Forward proxy to OffersMeta
- `server/middleware/auth.js` - Authentication handling

### UI Components Using Live Data
- `project/src/pages/Dashboard.tsx` - Dashboard with live metrics
- `project/src/pages/Contacts.tsx` - Publisher/Advertiser list
- `project/src/pages/Deals.tsx` - Offers pipeline
- `project/src/pages/Activities.tsx` - Conversion activity feed
- `project/src/pages/ReportsWorkspace.tsx` - Analytics reports

## Setup Instructions

### 1. Configure Backend Environment

Edit `server/.env`:
```env
PORT=4000
CRM_API_BASE_URL=https://apiv2.offersmeta.in
CRM_AUTH_MODE=static-bearer
CRM_BEARER_TOKEN=YOUR_API_TOKEN_HERE
FRONTEND_ORIGIN=http://localhost:5173
```

**Getting your API token:**
1. Login to your OffersMeta admin panel
2. Go to Settings → API Access
3. Copy your Bearer token
4. Paste it in `CRM_BEARER_TOKEN`

### 2. Configure Frontend Environment

The file `project/.env` is already configured:
```env
VITE_PROXY_BASE_URL=http://localhost:4000/api
VITE_API_BASE_URL=/api/proxy
```

### 3. Start the Backend Server

```bash
cd server
npm install
npm run dev
```

Server will start on `http://localhost:4000`

### 4. Start the Frontend

```bash
cd project
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

### 5. Login and View Live Data

1. Open `http://localhost:5173`
2. Select your account type (Admin/Publisher/Advertiser)
3. Enter your OffersMeta credentials
4. After login, the dashboard will show live data

## API Endpoints Wired

### Dashboard
- `/conversion/ConversionList` - Conversion data
- `/report/offerReport` - Revenue reports
- `/publicher/publisherList` - Publisher contacts
- `/advertiser/advertiserList` - Advertiser contacts
- `/offer/allOfferList` - Deals/Offers

### Contacts Page
- `/publicher/publisherList` - List publishers
- `/advertiser/advertiserList` - List advertisers

### Deals Page
- `/offer/offerList` - List offers
- `/offer/allOfferList` - All campaigns

### Activities Page
- `/conversion/ConversionList` - Conversion activities
- `/tracking/trackingList` - Tracking events
- `/sentLogs/sentLogList` - Postback logs

### Reports
- `/report/publisherReport` - Publisher performance
- `/report/advertiserReport` - Advertiser performance
- `/report/AffilitesPerformanceReport` - Affiliate metrics

## Troubleshooting

### Issue: "Failed to load live data"

**Cause:** Missing or invalid API token

**Solution:**
1. Check `server/.env` has valid `CRM_BEARER_TOKEN`
2. Restart the backend server after changing the token
3. Login again through the UI

### Issue: 403 Forbidden errors

**Cause:** Token is invalid or expired

**Solution:**
1. Get a fresh token from OffersMeta admin panel
2. Update `server/.env`
3. Clear browser localStorage
4. Login again

### Issue: No data showing after login

**Cause:** The account may not have data yet, or partners_Id is missing

**Solution:**
1. Check browser DevTools → Network tab for API responses
2. Verify your OffersMeta account has data
3. Set `CRM_PARTNERS_ID` in `server/.env` if needed

### Issue: CORS errors

**Cause:** Frontend and backend ports mismatch

**Solution:**
1. Ensure `FRONTEND_ORIGIN` in `server/.env` matches your frontend URL
2. Restart backend after changing

## Testing API Connection

### Quick Test with curl

```bash
# Test backend health
curl http://localhost:4000/health

# Test proxy with token
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:4000/api/proxy/publicher/publisherList
```

### Test from Browser Console

After logging in, open browser console and run:
```javascript
// Check if token is stored
console.log(localStorage.getItem('repowire_token'));

// Check API response
fetch('/api/proxy/publicher/publisherList')
  .then(r => r.json())
  .then(console.log);
```

## Production Deployment

### Backend (Node.js)
1. Set `CRM_BEARER_TOKEN` in production environment
2. Set `FRONTEND_ORIGIN` to your production URL
3. Deploy to any Node.js hosting (Heroku, Railway, VPS)

### Frontend (Vite/React)
1. Set `VITE_PROXY_BASE_URL` to your production backend URL
2. Build with `npm run build`
3. Deploy to any static hosting (Vercel, Netlify, S3)

## Summary

✅ All APIs are properly integrated
✅ Data flows from OffersMeta → Proxy → Frontend → UI
✅ Authentication is handled automatically
✅ Real-time data refresh every 30 seconds
✅ Error handling and loading states implemented

The only requirement is a valid OffersMeta API token in the backend environment.