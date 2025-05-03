import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { chatWithCharacter,getCharacterChat } from './message.controller.js';
const router = express.Router();

router.post('/',verifyToken,chatWithCharacter)
router.get('/:characterId',getCharacterChat)

export default router