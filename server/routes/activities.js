const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/', createForwardHandler({ method: 'GET', path: '/conversion/ConversionList' }));
router.get('/today', createForwardHandler({ method: 'GET', path: '/sentLogs/sentLogList' }));
router.get('/tasks/upcoming', createForwardHandler({ method: 'GET', path: '/conversion/postbackLogs' }));

module.exports = router;
