export interface TransactionDetails {
  transactionHash: string;
  status: string;
  block: string;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  additionalDetails: {
    etherPrice: string;
    gasUsed: string;
    nonce: string;
  };
}
