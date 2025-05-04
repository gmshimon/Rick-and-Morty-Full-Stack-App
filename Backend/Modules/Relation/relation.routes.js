import express from 'express';
import verifyToken from '../../Middleware/VerifyToken/verifyToken.js';
import { createRelationship, getRelationshipsForCharacter } from './relation.controller.js';
const router = express.Router();

router.post('/predict',verifyToken,createRelationship)
router.get('/:characterId',verifyToken,getRelationshipsForCharacter)

export default router;