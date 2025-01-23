import { GoogleGenerativeAI } from "@google/generative-ai";

const ApiKey: string = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(ApiKey);


export async function promptGemini(prompt: string, systemInstructions?: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstructions,
  });
  
    console.log("Generating Content...");
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text());
    return response.text();
  }

  // Create prompts that deliver the responde in a stream of chunks
export async function* promptGeminiStream(prompt: string, systemInstructions?: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstructions,
  });

  console.log("Generating Streamed Content...");

  const result = await model.generateContentStream(prompt);
  for await (const chunk of result.stream) {
    const chunkText: string = chunk.text();
    console.log(chunkText);
    yield chunkText;
  }
}