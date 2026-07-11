import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';

const defaultSystemPrompt = "You are Core AI, a highly intelligent and helpful AI assistant. Respond in clear markdown format. Keep answers structured and professional.";

// Formats the user's prompt by substituting the placeholder inside BasicPromopt.txt
async function getFormattedPrompt(userPrompt) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'config', 'BasicPromopt.txt');
    const content = await fs.readFile(filePath, 'utf-8');
    
    if (!content || content.trim() === '') {
      return userPrompt;
    }
    
    const placeholder = '[Insert your topic, keyword, or concept here]';
    if (content.includes(placeholder)) {
      return content.replace(placeholder, userPrompt);
    }
    
    return `${content}\n\nUser Request: ${userPrompt}`;
  } catch (error) {
    console.error("Error reading BasicPromopt.txt for prompt substitution:", error);
    return userPrompt;
  }
}

const mapModelName = (name) => {
  if (!name) return 'gemini-3.5-flash';
  
  const clean = name.toLowerCase().trim();
  // Map "3.5 flash" / "3.5 flesh" / "flash" to gemini-3.5-flash
  if (clean.includes('3.5-flesh') || clean.includes('3.5-flash') || clean.includes('flash')) {
    return 'gemini-3.5-flash';
  }
  // Map "3.1 pro" / "pro" to gemini-3.1-pro
  if (clean.includes('3.1-pro') || clean.includes('pro')) {
    return 'gemini-3.1-pro';
  }
  return name; // Allow direct pass-through for other models
};

export class GeminiService {
  constructor() {
    this.genAI = null;
  }

  getGenAI() {
    if (!this.genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in the environment variables! Please make sure your .env file is configured correctly.");
      }
      
      const maskedKey = apiKey.length > 10 
        ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`
        : '***';
      console.log(`Initializing GoogleGenerativeAI with key: ${maskedKey}`);
      
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI;
  }

  async generateStream(prompt, onChunk, onEnd, onError) {
    const candidateModels = [
      'gemini-3.5-flash',
      'gemini-3.1-pro',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    try {
      const formattedPrompt = await getFormattedPrompt(prompt);
      
      console.log("\n==================================================");
      console.log(`[Gemini Request] Original Prompt: "${prompt}"`);
      console.log(`[Gemini Request] Formatted Prompt:\n${formattedPrompt}`);
      console.log("==================================================");

      let lastError = null;

      for (const modelName of candidateModels) {
        try {
          console.log(`[Gemini Attempt] Trying model: ${modelName}...`);
          
          const model = this.getGenAI().getGenerativeModel({
            model: modelName,
            systemInstruction: defaultSystemPrompt,
          });

          const result = await model.generateContentStream(formattedPrompt);
          
          console.log(`[Gemini Success] Connected using model: ${modelName}`);
          console.log("----------------------- Response Chunks -----------------------");

          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              // Output chunks directly in the terminal as they stream in
              process.stdout.write(text);
              if (onChunk) {
                onChunk(text);
              }
            }
          }

          console.log("\n--------------------------------------------------");
          console.log("[Gemini Response] End of Stream");
          console.log("==================================================\n");

          if (onEnd) {
            onEnd();
          }
          return; // Successfully finished stream, exit function
        } catch (error) {
          console.warn(`[Gemini Warning] Model ${modelName} failed:`, error.message || error);
          lastError = error;
          // Loop will continue to test the next candidate model
        }
      }

      // If loop finishes, all candidate models failed
      console.error("\n[Gemini Error] All candidate models failed to generate content.");
      if (onError) {
        onError(lastError || new Error("All Gemini candidate models failed to generate content."));
      }
    } catch (outerError) {
      console.error(`\n[Gemini Outer Error] stream setup failed:`, outerError);
      if (onError) {
        onError(outerError);
      }
    }
  }

  async generateCompletion(prompt) {
    const candidateModels = [
      'gemini-3.5-flash',
      'gemini-3.1-pro',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    try {
      const formattedPrompt = await getFormattedPrompt(prompt);
      
      console.log(`[Gemini Request] Static Completion Prompt: "${prompt}"`);
      console.log(`[Gemini Request] Formatted Prompt:\n${formattedPrompt}`);

      let lastError = null;

      for (const modelName of candidateModels) {
        try {
          console.log(`[Gemini Attempt] Static completion trying model: ${modelName}...`);
          
          const model = this.getGenAI().getGenerativeModel({
            model: modelName,
            systemInstruction: defaultSystemPrompt,
          });

          const result = await model.generateContent(formattedPrompt);
          const response = await result.response;
          const text = response.text();
          console.log(`[Gemini Success] Static completion success using model: ${modelName} (${text.length} chars)`);
          return text;
        } catch (error) {
          console.warn(`[Gemini Warning] Static completion model ${modelName} failed:`, error.message || error);
          lastError = error;
          // Continue to next model
        }
      }

      throw lastError || new Error("All Gemini candidate models failed to generate completion.");
    } catch (outerError) {
      console.error(`[Gemini Outer Error] Completion failed:`, outerError);
      throw outerError;
    }
  }
}

export const geminiService = new GeminiService();
