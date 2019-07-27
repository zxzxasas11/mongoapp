const Redis = require('ioredis');
const config = require('../config/config');
const redis = {
    port: `${config.redis.port}`,          // Redis port
    host: `${config.redis.host}`,   // Redis host
    prefix: 'sam:', //存诸前缀
    //ttl: 60 * 60 * 23,  //过期时间
    //family: 4,
    db: 0
}
const newRedis = new Redis(redis);
module.exports = newRedis;
