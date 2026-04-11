const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/', createForwardHandler({ method: 'GET', path: '/manager/managerList' }));
router.get('/permissions', createForwardHandler({ method: 'GET', path: '/subAdmin/viewuserData' }));

module.exports = router;
