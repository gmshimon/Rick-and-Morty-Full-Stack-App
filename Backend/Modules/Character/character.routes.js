import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { createCharacter, deleteMyCharacter, getMyCharacter, updateMyCharacter,reGenerateBackstories,getSingleCharacter, runAnalysis } from './character.controller.js';
const router = express.Router();
router.post('/generate-backstories/:id',verifyToken,reGenerateBackstories)
router.post('/',verifyToken,createCharacter);
router.get('/get-my-character',verifyToken,getMyCharacter)
router.get('/:id',verifyToken,getSingleCharacter)
router.post('/analyze-personality/:id',runAnalysis)
router.put('/update/:id',verifyToken,updateMyCharacter)
router.delete('/delete-character/:id',verifyToken,deleteMyCharacter)
export default router;