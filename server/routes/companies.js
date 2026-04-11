const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/', createForwardHandler({ method: 'GET', path: '/admin/partnersList' }));
router.get('/:companyId', createForwardHandler({ method: 'GET', path: '/admin/view' }));

module.exports = router;
