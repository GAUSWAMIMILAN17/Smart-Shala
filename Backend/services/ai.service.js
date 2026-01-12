import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const evaluateAnswerAI = async ({
  question,
  modelAnswer,
  studentAnswer,
  maxMarks,
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `
You are an exam evaluator.

Question:
${question}

Model Answer:
${modelAnswer}

Student Answer:
${studentAnswer}

Instructions:
- Give marks out of ${maxMarks}
- Give short feedback in simple language
- Return response in JSON only

JSON Format:
{
  "marks": number,
  "feedback": "string"
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return JSON.parse(response);
  } catch (error) {
    console.log("AI Service Error:", error);
    return null;
  }
};
