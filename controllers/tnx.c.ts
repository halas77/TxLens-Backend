import { Request, Response } from "express";
import { scrapeEtherscanTransaction } from "../utils/scraper";
import { geminiSummary } from "../utils/summary";

export const getTnxDataByData = async (req: Request, res: Response) => {
  const { url } = req.params;
  const formmatUrl = `https://etherscan.io/tx/${url}`;
  const transactionData = await scrapeEtherscanTransaction(formmatUrl);
  const aiSummary = await geminiSummary(transactionData);
  res.json({ txData: transactionData, summary: aiSummary });
};
