const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/', createForwardHandler({ method: 'GET', path: '/offer/offerList' }));
router.post('/', createForwardHandler({ method: 'POST', path: '/offer/createOffer' }));
router.put('/:dealId', createForwardHandler({
	method: 'PUT',
	path: '/offer/updateOffer',
	query: (req) => ({ offerId: req.params.dealId }),
}));
router.get('/pipeline', createForwardHandler({ method: 'GET', path: '/report/offerReport' }));

module.exports = router;
