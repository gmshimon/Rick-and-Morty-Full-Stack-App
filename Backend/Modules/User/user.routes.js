import express from 'express';
import { createUser, fetchUser } from './user.controller.js';
const router = express.Router();

router.post('/',createUser)
router.post('/get-user',fetchUser)

export default router