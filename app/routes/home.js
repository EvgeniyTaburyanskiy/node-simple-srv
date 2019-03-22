const Router = require('restify-router').Router;
const router = new Router();
const logger = require('../winston')(module);

router.get('/', (req, res, next) => {

  res.send({status: 'success'});

  return next();
});

module.exports = router;