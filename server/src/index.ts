import express, { Request, Response } from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI with the provided API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Provide your API key in .env
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate', async (req: Request, res: Response) => {
  const { keyword } = req.body;

  try {
    // Example prompt for SEO suggestions
    const prompt = `Generate SEO optimized meta description for the keyword: ${keyword}.`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Use the latest stable model
      prompt,
      max_tokens: 60,
      temperature: 0.7
    });

    const suggestion = response.data.choices[0].text?.trim();

    // Return suggestion(s) as an array
    res.json({
      suggestions: [
        {
          id: Date.now().toString(),
          text: suggestion || 'No suggestion generated'
        }
      ]
    });
  } catch (error) {
    console.error('Error generating suggestion:', error);
    res.status(500).json({ error: 'Failed to generate suggestion' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
