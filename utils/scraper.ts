import axios from "axios";
import * as cheerio from "cheerio";
import { formatData } from "./lib";

export async function scrapeEtherscanTransaction(url: string) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const formattedData = formatData($);
    return formattedData;
  } catch (error) {
    throw new Error(
      `Scraping failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
