import { Request, Response } from "express";
import { extractTextFromHTML } from "../utils/extractData";
import { geminiSummary } from "../utils/generateSummary";

export const getTnxData = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "URL is required", data: null });
  }
  const transactionData = await extractTextFromHTML(url);
  const aiSummary = await geminiSummary(transactionData, url);
  res.json({
    success: true,
    data: { txData: transactionData, summary: aiSummary },
    error: null,
  });
};
