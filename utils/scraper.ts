import axios from "axios";
import * as cheerio from "cheerio";
import { formatAddressData, formatTxData } from "./lib";
const fs = require("fs");
const path = require("path");

export async function scrapeEtherscanTransaction(url: string) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    if (url.includes("tx")) {
      const formattedData = formatTxData($);
      return formattedData;
    } else if (url.includes("address")) {
      const formattedData = formatAddressData($);
      return formattedData;
    } else {
      return "Invalid URL";
    }
  } catch (error) {
    throw new Error(
      `Scraping failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
