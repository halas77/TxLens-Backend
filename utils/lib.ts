export const formatTxData = ($: any) => {
  const transactionHash = $("#spanTxHash").text().trim() || null;

  const status =
    $(".badge.bg-success").text().trim().replace(/\n/g, " ") || null;

  const block =
    $('div:contains("Block:")')
      .closest(".row")
      .find('a[href^="/block/"]')
      .text()
      .trim() || null;

  const timestampElement = $("#showUtcLocalDate");
  const timestamp = {
    display: timestampElement.text().trim() || null,
    unix: timestampElement.data("timestamp") || null,
  };

  const from =
    $('div:contains("From:")')
      .closest(".row")
      .find('a[href^="/address/"]')
      .first()
      .text()
      .trim() || null;

  const to =
    $('div:contains("To:")')
      .closest(".row")
      .find('a[href^="/address/"]')
      .first()
      .text()
      .trim() || null;

  const value = {
    eth:
      $('div:contains("Value:")')
        .closest(".row")
        .find('[data-bs-toggle="tooltip"]')
        .first()
        .text()
        .trim() || null,
    usd:
      $('div:contains("Value:")')
        .closest(".row")
        .find(".badge")
        .first()
        .text()
        .trim() || null,
  };

  const gasPrice =
    $("#ContentPlaceHolder1_spanGasPrice").text().trim().replace(/\s+/g, " ") ||
    null;

  const etherPrice =
    $("#ContentPlaceHolder1_spanClosingPrice").text().trim() || null;
  const gasUsed =
    $("#ContentPlaceHolder1_spanGasUsedByTxn").text().trim() || null;
  const nonce =
    $('span:contains("Nonce:")').text().replace("Nonce:", "").trim() || null;

  return {
    transactionHash,
    status,
    block,
    timestamp,
    from,
    to,
    value: value.eth ? `${value.eth} (${value.usd})` : null,
    gasPrice,
    additionalDetails: {
      etherPrice,
      gasUsed,
      nonce,
    },
  };
};

export const formatAddressData = ($: any) => {
  const transactionHistory = $("table.table-hover tbody tr")
    .map((_: any, row: any) => {
      const $row = $(row);
      const valueTooltip =
        $row.find(".td_showAmount").attr("data-bs-title") || "";

      return {
        hash: $row.find("td:nth-child(2) a.hash-tag").text().trim() || "",
        method: $row.find("td:nth-child(3) span").text().trim() || "",
        block: parseInt($row.find("td:nth-child(4) a").text().trim(), 10) || 0,
        timestamp: $row.find(".showAge span").attr("data-bs-title") || "",
        from:
          $row.find("td:nth-child(6) [data-highlight-target]").text().trim() ||
          "",
        to:
          $row.find('td:nth-child(8) a[href^="/address/"]').text().trim() || "",
        value: {
          eth: (valueTooltip.split(" | ")[0] || "").replace(" ETH", ""),
          usd: (valueTooltip.split(" | ")[1] || "").replace("$", ""),
        },
        fee:
          $row
            .find(".showTxnFee")
            .text()
            ?.replace(/<b>\.<\/b>/g, ".") || "",
        gasPrice:
          $row
            .find(".showGasPrice")
            .text()
            ?.replace(/<b>\.<\/b>/g, ".") || "",
        direction:
          $row.find("td:nth-child(7) .badge").text().trim() === "OUT"
            ? "OUT"
            : "IN",
        contractInteraction:
          $row.find("td:nth-child(8) i.fa-file-alt").length > 0,
      };
    })
    .get();

  return {
    overview: {
      ethBalance: $(".fa-ethereum").parent().text().trim().split(" ")[1] || "",
      ethValue: {
        usd:
          $('.card-body:contains("Eth Value")')
            .contents()
            .filter(function (this: HTMLElement) {
              return $(this).text().trim().startsWith("$");
            })
            .text()
            .trim()
            .split(" ")[0] || "",
        rate:
          $('.card-body:contains("Eth Value") span.small')
            .text()
            .match(/\$([\d,.]+)/)?.[1] || "",
      },
    },
    transactions: {
      latest: {
        timeAgo:
          $('h4:contains("Transactions Sent") + div a:first').text().trim() ||
          "",
        txHash:
          $('h4:contains("Transactions Sent") + div a:first')
            .attr("href")
            ?.split("/")
            .pop() || "",
      },
      first: {
        timeAgo:
          $('h4:contains("Transactions Sent") + div a:last').text().trim() ||
          "",
        txHash:
          $('h4:contains("Transactions Sent") + div a:last')
            .attr("href")
            ?.split("/")
            .pop() || "",
      },
    },
    fundedBy: {
      address:
        $('h4:contains("Funded By") + div a[href^="/address/"]')
          .attr("href")
          ?.split("/")
          .pop() || "",
      name: $('h4:contains("Funded By") + div img').attr("data-bs-title") || "",
      txHash:
        $('h4:contains("Funded By") + div a.hash-tag')
          .attr("href")
          ?.split("/")
          .pop() || "",
    },
    multichain: {
      portfolioValue:
        $("#multichain-button span")
          .text()
          .match(/\$([\d.]+)/)?.[1] || "",
      alternateExplorers: $(
        '#ContentPlaceHolder1_divMultichainAddress a[target="_blank"]'
      )
        .map((_: any, el: any) => ({
          name: $(el).find("span.hash-tag").text().trim() || "",
          url: $(el).attr("href") || "",
          value:
            $(el)
              .find("span.text-muted")
              .text()
              .match(/\$(\d+)/)?.[1] || "",
        }))
        .get(),
    },
    transactionHistory,
  };
};
