const Router = require('restify-router').Router;
const router = new Router();
const logger = require('../winston')(module);

router.add('', require('./home'));
router.add('/send_transaction', require('./send_transaction'));

router.get('/break', (req, res, next) => {
  res.status(500);
  res.json({
    status: 500,
    code: 'Error'
  });
  return next();
});

module.exports = router;