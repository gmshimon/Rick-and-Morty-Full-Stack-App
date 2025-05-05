// Modules/User/user.controller.js

import logger from '../../Logger/logger.js';
import generateToken from '../../Utilis/token.js';
import Users from './user.model.js';
import redisClient from '../../Middleware/Redis/redisClient.js';

const USER_CACHE_TTL = 60 * 60; 

const cacheKey = (type, value) => `user:${type}:${value}`;

export const createUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const key = cacheKey('email', email);

    // 1. Find or create in Mongo
    let user = await Users.findOne({ email });
    let message, statusCode;

    if (!user) {
      user = await Users.create({ email, name, /* …other fields… */ });
      message = 'User created successfully';
      statusCode = 201;
    } else {
      logger.info(`User already exists: ${email}`);
      message = 'User already exists';
      statusCode = 200;
    }

    // 2. Cache-on-write (with TTL)
    try {
      await redisClient.set(key, JSON.stringify(user), {
        EX: USER_CACHE_TTL
      });
      logger.debug(`Cached user ${email} for ${USER_CACHE_TTL}s`);
    } catch (err) {
      logger.error(`Redis SET failed for ${key}: ${err.message}`);
      // not fatal—let the request succeed
    }

    // 3. Issue token and respond
    const token = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email
    });

    res.status(statusCode).json({
      status: 'Success',
      message,
      data: user,
      token
    });
  } catch (err) {
    logger.error(`createUser error: ${err.stack || err}`);
    next('Failed to create user');
  }
};

export const fetchUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const key = cacheKey('email', email);

    // 1. Try cache-on-read
    let cached;
    try {
      cached = await redisClient.get(key);
    } catch (err) {
      logger.error(`Redis GET failed for ${key}: ${err.message}`);
    }

    if (cached) {
      const user = JSON.parse(cached);
      return res.status(200).json({
        status: 'Success',
        message: 'User fetched successfully (from cache)',
        data: user
      });
    }

    // 2. Fallback to database
    const user = await Users.findOne({ email });
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      return next(err);
    }

    // 3. Populate cache for next time
    try {
      await redisClient.set(key, JSON.stringify(user), {
        EX: USER_CACHE_TTL
      });
      logger.debug(`Cached user ${email} for ${USER_CACHE_TTL}s`);
    } catch (err) {
      logger.error(`Redis SET failed for ${key}: ${err.message}`);
    }

    // 4. Return fresh data
    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    });
  } catch (err) {
    logger.error(`fetchUser error: ${err.stack || err}`);
    next(err);
  }
};
