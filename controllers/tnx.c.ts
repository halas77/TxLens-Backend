import { Request, Response } from "express";
import { scrapeEtherscanTransaction } from "../utils/scraper";
import { geminiSummary } from "../utils/summary";

export const getTnxDataByData = async (req: Request, res: Response) => {
  const { url } = req.params;
  const transactionData = await scrapeEtherscanTransaction(url);
  const aiSummary = await geminiSummary(transactionData);
  res.json({ txData: transactionData, summary: aiSummary });
};
