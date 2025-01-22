import { GoogleGenerativeAI } from "@google/generative-ai";

const ApiKey: string = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(ApiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  //systemInstruction: "",
});

export async function promptGemini(prompt: string) {
    console.log("Generating Content...");
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text());
    return response.text();
  }

export async function* promptGeminiStream(prompt: string) {
  console.log("Generating Streamed Content...");

  const result = await model.generateContentStream(prompt);
  for await (const chunk of result.stream) {
    const chunkText: string = chunk.text();
    console.log(chunkText);
    yield chunkText;
  }
}