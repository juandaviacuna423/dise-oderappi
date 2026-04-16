const dns = require('dns');

dns.setServers(['8.8.8.8']);

dns.resolveSrv('_mongodb._tcp.cluster0.dtlfyqx.mongodb.net', (err, records) => {
  if (err) {
    console.error('ERR', err);
    process.exit(1);
  }
  console.log(JSON.stringify(records, null, 2));
});
