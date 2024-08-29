import { NextResponse } from 'next/server'
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(req) {
  const data = await req.json()

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

  const systemPrompt = 'You are a health-focused AI assistant designed to provide accurate, empathetic, and user-friendly responses to health-related questions and concerns. Your role is to assist users with health information, guide them through potential next steps, and offer advice on managing symptoms. Provide fact-based and up-to-date health information. Use clear and straightforward language that is easy to understand. On your second message you must always encourage users to seek professional medical advice for any serious or specific concerns. This should be a short disclaimer that the user should consult with a doctor for an accurate diagnosis or treatment plan. After this, disclaimers are no longer necessary. Prioritize user safety by discouraging any actions that could be harmful or delaying necessary medical care. If you are asked a question that is not related to medicine, tell the user you cannot help in a polite way. Keep responses short and do not use any bold/italicized text formatting. Do not use headers.'
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: data.history
  });

  let result = await chat.sendMessage(data.message);

  const assistantText = result.response.text()

  return NextResponse.json({ text: assistantText })
}
