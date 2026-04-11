const axios = require('axios');

let oauthCache = {
  accessToken: null,
  expiresAtMs: 0,
};

const shouldUseOAuth = () => process.env.CRM_AUTH_MODE === 'oauth2-client';

async function refreshOAuthTokenIfNeeded() {
  if (!shouldUseOAuth()) {
    return null;
  }

  const now = Date.now();
  if (oauthCache.accessToken && oauthCache.expiresAtMs > now + 30_000) {
    return oauthCache.accessToken;
  }

  const tokenUrl = process.env.OAUTH_TOKEN_URL;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!tokenUrl || !clientId || !clientSecret) {
    throw new Error('OAuth2 is enabled but token env vars are missing.');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  if (process.env.OAUTH_SCOPE) {
    body.set('scope', process.env.OAUTH_SCOPE);
  }

  const response = await axios.post(tokenUrl, body.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const accessToken = String(response.data?.access_token || '');
  const expiresInSec = Number(response.data?.expires_in || 3600);

  if (!accessToken) {
    throw new Error('OAuth2 token response did not include access_token.');
  }

  oauthCache = {
    accessToken,
    expiresAtMs: now + expiresInSec * 1000,
  };

  return accessToken;
}

async function attachAuth(req, _res, next) {
  try {
    const mode = process.env.CRM_AUTH_MODE || 'static-bearer';
    const headers = {};

    if (mode === 'forward-client') {
      const incoming = req.headers.authorization;
      if (incoming) {
        headers.Authorization = incoming;
      }
    } else if (mode === 'oauth2-client') {
      const token = await refreshOAuthTokenIfNeeded();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } else {
      const token = process.env.CRM_BEARER_TOKEN || '';
      if (token) {
        headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }
    }

    req.crmAuthHeaders = headers;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  attachAuth,
};
