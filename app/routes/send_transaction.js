const Router = require('restify-router').Router;
const router = new Router();
const logger = require('../winston')(module);

router.get('/:tx', (req, res, next) => {
  // do something with req.body
  res.send({params: req.params});
/*
  res.setTimeout(1000*5, function() {
    res.send({params: req.params});
    logger.debug(JSON.stringify({params: req.params}));
  });
*/
  //logger.debug(JSON.stringify({params: req.params}));

  return next();
});

router.get('', (req, res, next) => {
  res.send({query: req.query});
/*
  res.setTimeout(10000*5, function() {
    res.send({query: req.query});
    logger.debug(JSON.stringify({query: req.query}));
  });
*/
  next();
});

module.exports = router;