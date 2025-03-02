import { Request, Response } from "express";
import { scrapeEtherscanTransaction } from "../utils/scraper";
import { geminiSummary } from "../utils/summary";

export const getTnxData = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "URL is required", data: null });
  }
  const transactionData = await scrapeEtherscanTransaction(url);
  const aiSummary = await geminiSummary(transactionData, url);
  res.json({
    success: true,
    data: { txData: transactionData, summary: aiSummary },
    error: null,
  });
};
