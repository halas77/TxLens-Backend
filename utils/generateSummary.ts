import { GoogleGenerativeAI } from "@google/generative-ai";
import { addressPrompt, blockPrompt, tnxPrompt, tokenPrompt } from "./prompts";

export async function geminiSummary(txData: any, url: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  switch (true) {
    case txData && url.includes("tx"):
      const formattedTxPrompt = `${tnxPrompt}: ${JSON.stringify(
        txData,
        null,
        2
      )}`;

      const txResult = await model.generateContent(formattedTxPrompt);
      return txResult.response.text();

    case txData && url.includes("address"):
      const formattedAddressPrompt = ` ${addressPrompt}: ${JSON.stringify(
        txData,
        null,
        2
      )}`;

      const addressResult = await model.generateContent(formattedAddressPrompt);
      return addressResult.response.text();

    case txData && url.includes("block"):
      const formattedBlockPrompt = ` ${blockPrompt}: ${JSON.stringify(
        txData,
        null,
        2
      )}`;

      const blockResult = await model.generateContent(formattedBlockPrompt);
      return blockResult.response.text();

    case txData && url.includes("token"):
      const formattedTokenPrompt = ` ${tokenPrompt}: ${JSON.stringify(
        txData,
        null,
        2
      )}`;

      const tokenResult = await model.generateContent(formattedTokenPrompt);
      return tokenResult.response.text();

    default:
      return "Oops!😔 I can't analyze this URL. Please provide a valid transaction or address URL. (example: etherscan.io/tx/0x538..  OR etherscan.io/address/0x538..  )";
  }
}
