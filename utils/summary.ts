import { GoogleGenerativeAI } from "@google/generative-ai";

export async function geminiSummary(txData: any, url: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  if (url.includes("tx")) {
    const prompt = `Analyze this Ethereum transaction and create a concise summary for any user.
      Focus on:
      - Key parties (from/to)
      - Value transferred (ETH + USD)
      - Network fees
      - Transaction success status
      - Notable characteristics
  
      Format:
      1. Start with emoji relevant to transaction type
      2. Use short paragraphs with key metrics and no title
      3. Add "ℹ️ Pro Tip:" section if gas fees seem high:
  
      ${JSON.stringify(txData, null, 2)}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } else if (url.includes("address")) {
    const prompt = `Analyze this Ethereum address and create a concise summary for any user.
      Focus on:
      - Key transactions
      - Total value transferred (ETH + USD)
      - Network fees
      - Notable characteristics
  
      Format:
      1. Start with emoji relevant to address type
      2. Use short paragraphs with key metrics and no title
  
      ${JSON.stringify(txData, null, 2)}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } else {
    return "Oops!😔 I can't analyze this URL. Please provide a valid transaction or address URL.";
  }
}
