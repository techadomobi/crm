const axios = require('axios');

const upstream = axios.create({
  baseURL: process.env.CRM_API_BASE_URL || 'https://apiv2.offersmeta.in',
  timeout: 30_000,
});

function buildQuery(req, extraQuery) {
  const merged = {
    ...req.query,
    ...extraQuery,
  };

  delete merged.path;

  if (process.env.CRM_PARTNERS_ID && !merged.partners_Id) {
    merged.partners_Id = process.env.CRM_PARTNERS_ID;
  }

  return merged;
}

function normalizeResponse(data, meta) {
  return {
    success: true,
    data,
    meta,
  };
}

function createForwardHandler(config) {
  return async function forward(req, res, next) {
    try {
      const method = (config.method || req.method || 'GET').toUpperCase();
      const path = typeof config.path === 'function' ? config.path(req) : config.path;
      const dynamicQuery = typeof config.query === 'function' ? config.query(req) : (config.query || {});
      const query = buildQuery(req, dynamicQuery);

      const response = await upstream.request({
        method,
        url: path,
        params: query,
        data: ['GET', 'HEAD'].includes(method) ? undefined : req.body,
        headers: {
          ...(req.crmAuthHeaders || {}),
          ...(config.headers || {}),
        },
      });

      res.json(normalizeResponse(response.data, {
        upstreamPath: path,
        upstreamStatus: response.status,
      }));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  createForwardHandler,
};
