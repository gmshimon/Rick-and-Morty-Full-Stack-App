import { RedisStore } from "connect-redis";
import session from 'express-session';
import redisClient from './redisClient.js'

const sessionStore = new RedisStore({client:redisClient})

const sessionMiddleware  = session({
    store:sessionStore,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false,maxAge:60000}
})

export default sessionMiddleware