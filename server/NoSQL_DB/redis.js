var redis = require("redis"), RDS_PORT = 6379, RDS_HOST = "18.191.222.99", RDS_OPTS = {},client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS)
const { promisify } = require("util");

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const expAsync = promisify(client.expire).bind(client);
const scanAsync = promisify(client.scan).bind(client);

module.exports.getAsync = getAsync;
module.exports.setAsync = setAsync;
module.exports.delAsync = delAsync;
module.exports.expAsync = expAsync;
module.exports.scanAsync = scanAsync;