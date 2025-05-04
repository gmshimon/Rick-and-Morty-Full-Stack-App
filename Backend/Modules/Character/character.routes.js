import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { createCharacter, deleteMyCharacter, getMyCharacter, updateMyCharacter,reGenerateBackstories } from './character.controller.js';
const router = express.Router();

router.delete('/delete-character/:id',verifyToken,deleteMyCharacter)
router.put('/update/:id',verifyToken,updateMyCharacter)
router.post('/generate-backstories/:id',verifyToken,reGenerateBackstories)
router.post('/',verifyToken,createCharacter);
router.get('/get-my-character',verifyToken,getMyCharacter)
export default router;