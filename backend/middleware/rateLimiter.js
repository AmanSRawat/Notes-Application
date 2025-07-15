import {rateLimit} from 'express-rate-limit'

const limiter = rateLimit({
    windows: 60*1000, //1 minute
    limit: 10, //Limit each IP to 10 request per window
    legacyHeaders: false,
})

export default limiter