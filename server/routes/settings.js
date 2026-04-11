const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/plans', createForwardHandler({ method: 'GET', path: '/admin/planList' }));
router.post('/plans', createForwardHandler({ method: 'POST', path: '/admin/addPlan' }));
router.put('/plans', createForwardHandler({ method: 'PUT', path: '/admin/updatePlan' }));
router.get('/countries', createForwardHandler({ method: 'GET', path: '/user/countrylist' }));

module.exports = router;
