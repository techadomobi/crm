const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/', createForwardHandler({ method: 'GET', path: '/admin/notificationApi' }));
router.post('/webhooks/postback', createForwardHandler({ method: 'POST', path: '/publisherManagement/postbackMangement' }));

module.exports = router;
