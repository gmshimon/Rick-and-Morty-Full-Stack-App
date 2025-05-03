import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { createCharacter, deleteMyCharacter, getMyCharacter } from './character.controller.js';
const router = express.Router();

router.delete('/delete-character/:id',verifyToken,deleteMyCharacter)
router.post('/',verifyToken,createCharacter);
router.get('/get-my-character',verifyToken,getMyCharacter)
export default router;