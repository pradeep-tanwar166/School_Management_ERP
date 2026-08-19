// Rate limiter

const rateLimiter=require('express-rate-limit');

const limiter=rateLimiter({
    windowMs:60*1000,//1 minute
    max:100 // 100 requests per user
});


module.exports={
    limiter,
}