const Router = require('restify-router').Router;
const router = new Router();
const logger = require('../winston')(module);

router.get('', (req, res, next) => {
  res.send({
    jsonrpc: '2.0',
    id     : '',
    result : {
      version            : '0.14.3-953615c6',
      latest_block_hash  : '28CB2B1ADA729E7D488B1047666FA734AB3208E2B983BFBC0041BC37D0472842',
      latest_app_hash    : '3CE432E1487123DA4B2889A48918C02626EDC67B6F5C74A0BA5AE8CAF412A3C2',
      latest_block_height: '566527',
      latest_block_time  : '2019-03-22T22:15:16.907724603Z',
      state_history      : 'off',
      tm_status          : {
        node_info     : {
          protocol_version: {
            p2p  : '7',
            block: '10',
            app  : '2'
          },
          id              : '647e32df3b9c54809b5aca2877d9ba60900bc2d9',
          listen_addr     : 'tcp://0.0.0.0:26656',
          network         : 'minter-test-network-33',
          version         : '0.30.1',
          channels        : '4020212223303800',
          moniker         : 'minter-node-1.testnet.minter.network',
          other           : {
            tx_index   : 'on',
            rpc_address: 'tcp://0.0.0.0:26667'
          }
        },
        sync_info     : {
          latest_block_hash  : '28CB2B1ADA729E7D488B1047666FA734AB3208E2B983BFBC0041BC37D0472842',
          latest_app_hash    : '3CE432E1487123DA4B2889A48918C02626EDC67B6F5C74A0BA5AE8CAF412A3C2',
          latest_block_height: '566527',
          latest_block_time  : '2019-03-22T22:15:16.907724603Z',
          catching_up        : false
        },
        validator_info: {
          address     : 'F4935E4169DD647F11E9E01EFB04779D3AC3AA9B',
          pub_key     : {
            type : 'tendermint/PubKeyEd25519',
            value: 'SuHuc+YTbIWwypM6mhNHdYozSIXxCzI4OYpnrC6xU7g='
          },
          voting_power: '0'
        }
      }
    }
  });

  next();
});

module.exports = router;