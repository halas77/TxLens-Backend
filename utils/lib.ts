import { GoogleGenerativeAI } from "@google/generative-ai";

export const extractRelevantData = async ($: any) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || "");

  $(
    "script, style, svg, header, footer, nav, aside, iframe, noscript, form, object, [hidden], [aria-hidden='true'], [style*='display: none']"
  ).remove();

  const extractedText = $("body")
    .text()
    .replace(/\s{2,}/g, " ")
    .trim();

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
        Extract and return relevant blockchain information details from the following text. 
        Ensure the response is in a JSON format with the relevant key-value pairs and include table data if available.: 
        
        TEXT:
        ${extractedText}
    `;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export function formatSummary(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<b  className='text-semibold'>$1</b>")
    .replace(/\*(.*?)\*/g, "<i className='italic'>$1</i>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}
