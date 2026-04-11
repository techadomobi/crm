const express = require('express');
const { createForwardHandler } = require('../utils/proxy');

const router = express.Router();

router.get('/', createForwardHandler({ method: 'GET', path: '/publicher/publisherList' }));
router.post('/', createForwardHandler({ method: 'POST', path: '/publicher/addPublicher' }));
router.put('/:publisherId', createForwardHandler({
  method: 'PUT',
  path: '/publicher/updatePublisher',
  query: (req) => ({ publisherId: req.params.publisherId }),
}));
router.delete('/:publisherId', createForwardHandler({
  method: 'POST',
  path: '/publisherApproved/blockPublisher',
  query: (req) => ({ publisherId: req.params.publisherId }),
}));
router.get('/search/list', createForwardHandler({ method: 'GET', path: '/offer/searchpublisherAPI' }));

module.exports = router;
