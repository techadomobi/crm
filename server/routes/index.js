const express = require('express');
const contacts = require('./contacts');
const leads = require('./leads');
const deals = require('./deals');
const activities = require('./activities');
const companies = require('./companies');
const reports = require('./reports');
const users = require('./users');
const notifications = require('./notifications');
const settings = require('./settings');
const proxy = require('./proxy');

const router = express.Router();

router.use('/contacts', contacts);
router.use('/leads', leads);
router.use('/deals', deals);
router.use('/activities', activities);
router.use('/companies', companies);
router.use('/reports', reports);
router.use('/users', users);
router.use('/notifications', notifications);
router.use('/settings', settings);
router.use('/proxy', proxy);

module.exports = router;
