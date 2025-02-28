import { Request, Response } from "express";
import { scrapeEtherscanTransaction } from "../utils/scraper";
import { geminiSummary } from "../utils/summary";

export const getTnxDataByData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const url = `https://etherscan.io/tx/${id}`;
  const transactionData = await scrapeEtherscanTransaction(url);
  const aiSummary = await geminiSummary(transactionData);
  res.json({ txData: transactionData, summary: aiSummary });
};
