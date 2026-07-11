import { geminiService } from '../Service/geminiService.js';

export const handlePrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const responseText = await geminiService.generateCompletion(prompt);
    res.status(200).json({ success: true, data: responseText });
  } catch (error) {
    next(error);
  }
};
