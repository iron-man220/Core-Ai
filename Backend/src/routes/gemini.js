import express from 'express';
import { handlePrompt } from '../controllers/geminiController.js';

const router = express.Router();

router.post('/chat', handlePrompt);

export default router;
