import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { generateRecommendations } from './episode.controller.js';
const router = express.Router();

router.post('/:id',verifyToken,generateRecommendations)

export default router