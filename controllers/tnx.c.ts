/**
 * Fetches and extracts transaction data from the provided URL.
 *
 * @param {string} url - The URL of the HTML page to extract transaction data from.
 * @returns {Promise<any>} A promise that resolves to the extracted transaction data.
 */

import { Request, Response } from "express";
import { extractTextFromHTML } from "../utils/extractData";
import { geminiSummary } from "../utils/generateSummary";
import { formatSummary } from "../utils/lib";

export const getTnxData = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "URL is required", data: null });
      return;
    }

    const transactionData = await extractTextFromHTML(url);
    const aiSummary = await geminiSummary(transactionData, url);
    const formattedSummary = formatSummary(aiSummary);

    res.json({
      success: true,
      data: { summary: formattedSummary },
      error: null,
    });
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    res.status(500).json({ error: "Internal Server Error", data: null });
  }
};
