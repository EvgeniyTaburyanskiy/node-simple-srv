const Router = require('restify-router').Router;
const router = new Router();
const logger = require('../winston')(module);

const oTxResult = {
  'OK' : {
    "jsonrpc": "2.0",
    "id": "",
    "result": {
      "balance": {
        "MNT": "300000000000042000000"
      },
      "transaction_count": "66"
    }
  },
  'ERR': {
    "jsonrpc": "2.0",
    "id": "",
    "error": {
      "code": -32602,
      "message": "Invalid params",
      "data": "Error converting http params to arguments: json: cannot unmarshal hex string of odd length into Go value of type types.Address"
    }
  }

};

router.get('/:address', (req, res, next) => {
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