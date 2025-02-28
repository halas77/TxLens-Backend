export const formatData = ($: any) => {
  const transactionHash = $("#spanTxHash").text().trim();

  const status = $(".badge.bg-success").text().trim().replace(/\n/g, " ");

  const block = $('div:contains("Block:")')
    .closest(".row")
    .find('a[href^="/block/"]')
    .text()
    .trim();

  const timestampElement = $("#showUtcLocalDate");
  const timestamp = {
    display: timestampElement.text().trim(),
    unix: timestampElement.data("timestamp"),
  };

  const from = $('div:contains("From:")')
    .closest(".row")
    .find('a[href^="/address/"]')
    .first()
    .text()
    .trim();

  const to = $('div:contains("To:")')
    .closest(".row")
    .find('a[href^="/address/"]')
    .first()
    .text()
    .trim();

  const value = {
    eth: $('div:contains("Value:")')
      .closest(".row")
      .find('[data-bs-toggle="tooltip"]')
      .first()
      .text()
      .trim(),
    usd: $('div:contains("Value:")')
      .closest(".row")
      .find(".badge")
      .first()
      .text()
      .trim(),
  };

  const gasPrice = $("#ContentPlaceHolder1_spanGasPrice")
    .text()
    .trim()
    .replace(/\s+/g, " ");

  const etherPrice = $("#ContentPlaceHolder1_spanClosingPrice").text().trim();
  const gasUsed = $("#ContentPlaceHolder1_spanGasUsedByTxn").text().trim();
  const nonce = $('span:contains("Nonce:")')
    .text()
    .replace("Nonce:", "")
    .trim();

  return {
    transactionHash,
    status,
    block,
    timestamp,
    from,
    to,
    value: `${value.eth} (${value.usd})`,
    gasPrice,
    additionalDetails: {
      etherPrice,
      gasUsed,
      nonce,
    },
  };
};
