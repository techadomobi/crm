const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/overview', createForwardHandler({ method: 'GET', path: '/report/offerReport' }));
router.get('/analytics', createForwardHandler({ method: 'GET', path: '/eventReport/partnerEventValueReport' }));
router.get('/revenue', createForwardHandler({ method: 'GET', path: '/conversion/totalRevenue' }));

module.exports = router;
