const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/pipeline', createForwardHandler({ method: 'GET', path: '/report/publishersReport' }));
router.get('/status', createForwardHandler({ method: 'GET', path: '/publicher/publisherConversionList' }));
router.post('/convert', createForwardHandler({ method: 'PUT', path: '/publisher/approoveOffer' }));

module.exports = router;
