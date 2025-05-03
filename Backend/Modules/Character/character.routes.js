import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { createCharacter, getMyCharacter } from './character.controller.js';
const router = express.Router();

router.post('/',verifyToken,createCharacter);
router.get('/get-my-character',verifyToken,getMyCharacter)

export default router;