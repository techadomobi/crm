const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok', mode: 'render-proxy' });
});

router.all('/*', createForwardHandler({
  path: (req) => `/${String(req.params[0] || '').replace(/^\/+/, '')}`,
}));

module.exports = router;