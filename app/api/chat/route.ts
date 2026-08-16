import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { text: 'Missing GEMINI_API_KEY in .env.local.' },
        { status: 500 }
      );
    }

    const { message, logs } = await req.json();

    const systemPrompt = `
      You are Aura, an empathetic health companion inside the AuraCycle app.
      Recent Period Logs: ${JSON.stringify(logs || [])}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error?.message || error);
    return NextResponse.json(
      { text: `Error: ${error?.message || 'API request failed.'}` },
      { status: 500 }
    );
  }
}