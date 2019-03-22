const Router = require('restify-router').Router;
const router = new Router();
const logger = require('../winston')(module);

const oTxResult = {
  'OK' : {
    'jsonrpc': '2.0',
    'id'     : '',
    'result' : {
      'code': 0,
      'data': '',
      'log' : '',
      'hash': 'A535D002C4E3E1DE2133F8F778364F668AA9119B9C52F16F2685D21BDC1D240E'
    }
  },
  'ERR': {
    'jsonrpc': '2.0',
    'id'     : '',
    'error'  : {
      'code'     : 412,
      'message'  : 'Check tx error',
      'tx_result': {
        'code': 114,
        'log' : 'Gas price of tx is too low to be included in mempool. Expected 10'
      }
    }
  }

};

router.get('/:tx', (req, res, next) => {
  // do something with req.body
  res.send(oTxResult.OK);
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
  //res.send({query: req.query});
  res.send(oTxResult.OK);
  /*
    res.setTimeout(10000*5, function() {
      res.send({query: req.query});
      logger.debug(JSON.stringify({query: req.query}));
    });
  */
  next();
});

module.exports = router;