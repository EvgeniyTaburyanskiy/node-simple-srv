'use strict';
require = require('esm')(module);

const cluster = require('cluster');
const os = require('os');
const corsMiddleware = require('restify-cors-middleware');

const env = process.env.NODE_ENV || 'dev';
const {version} = require('./package');
const config = require(`./config/conf.${env}`); // eslint-disable-line
const logger = require('./app/winston')(module);

config.port = process.env.PORT || config.port;

function hrtime() {
  var hr = process.hrtime();
  return hr[0] * 1e3 + hr[1] * 1e-6;
}

function clearScreen() {
  process.stdout.write('\x1Bc'); /* <ESC>c - reset terminal (no history) */
}

const lastTimes = {};
function timeFromLast(name) {
  let curt = hrtime();
  let res = 0;
  if (lastTimes[name])
    res = curt - lastTimes[name];
  lastTimes[name] = curt;
  return res;
}

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  const arWorkers = [];
  const oStats = {
    numReqTotal : 0,
    numReqPerSec: 0,
    avgReq      : 0
  };

  let startTime = hrtime();

  logger.profile('Server is active. Forking workers now.');
  logger.profile(`${logger}.master.start workers=${cpuCount}`);

  cluster.on('online', worker => {
    logger.info(`${env}.master.worker.online id=${worker.id}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`${env}.master.worker.exit   id=${worker.id} code=${signal || code}`);
    cluster.fork();
  });

  for (let i = 0; i < cpuCount; i++) {
    let worker = cluster.fork();

    worker.on('message', function(msg) {
      switch (msg.cmd) {
        case 'notifyRequest':
          oStats.numReqPerSec++;
          oStats.numReqTotal++;
          break;
      }
    });

    arWorkers.push(worker);
  }

  logger.profile(`${env}.master.start workers=${cpuCount}`);

  let iConTimer = setInterval(() => {
    //let iTickGone=timeFromLast('tick');
    clearScreen();
    let elapsed = new Date(hrtime() - startTime + 100).toUTCString().slice(17, 25);
    oStats.avgReq = Number(oStats.numReqTotal/elapsed).toFixed(4);
    console.log('Elapsed: ' + elapsed + '; ' + new Date());
    console.log(`Total handled ${oStats.numReqTotal} avg: ${oStats.avgReq}`);
    console.log();
    console.log(`Now: ${oStats.numReqPerSec} req/sec`);
    console.log();

    oStats.numReqPerSec = 0;

  }, 1000);

}

if (cluster.isWorker) {

  const restify = require('restify'),
        server  = restify.createServer({
          name   : 'Test Minter nodeJs connections',
          version: '0.1.0'
        }),
        port    = config.port,
        id      = cluster.worker ? cluster.worker.id : process.pid,
        router  = require('./app/routes/');

  const cors = corsMiddleware({
    origins: ['*']
  });
  let iConnHandled = 0;

  process.on('message', function(msg) {
    process.send({
      id     : msg.id,
      type   : 'counter',
      iWorker: id,
      count  : iConnHandled
    });
  });

  //server.server.setTimeout(60000*5);// 5 minutes.

  server.on('request', function(req, res) {
    process.send({cmd: 'notifyRequest'});
    iConnHandled++;

    res.on('close', function() {
    });
  });

  //server.use(restify.authorizationParser());
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.pre(cors.preflight);
  server.use(cors.actual);

  server.listen(port, function() {
    router.applyRoutes(server);
    logger.info(`${env}.worker.start id=${id} port=${port}`);
  });
}