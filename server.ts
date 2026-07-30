import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: 'Gemini API not configured' });
  }

  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    let systemInstruction = "You are a helpful assistant.";

    if (context === 'home') {
      systemInstruction = "You are ElKairon's Receptionist AI. You warmly welcome visitors, briefly explain that ElKairon Global Connect bridges African talent with opportunities in Europe and the UAE, and help them decide whether to visit the Candidate Portal or the Employer Portal. Keep your answers concise, friendly, and professional.";
    } else if (context === 'candidate') {
      systemInstruction = "You are the Candidate Success Assistant at ElKairon. You help African professionals understand the recruitment process, work permit steps (10% initial, 20% offer, etc.), and how to prepare their resumes. You are encouraging, professional, and knowledgeable about relocation.";
    } else if (context === 'employer') {
      systemInstruction = "You are the Employer Partnership Assistant at ElKairon. You help global companies understand how they can hire vetted, compliant talent from Africa through our agency. Focus on our speed, compliance (CIPA registered), and risk reduction. Maintain a B2B, highly professional tone.";
    }

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
