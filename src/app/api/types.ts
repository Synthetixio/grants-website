export interface FundData {
  name: string;
  address: string;
  apy: ApyData;
  totalValue: number;
  fundComposition: FundComposition;
}

export interface ApyData {
  weekly: number;
  monthly: number;
}

export interface FundComposition {
  tokenName: string;
  tokenAddress: string;
  amount: number;
  rate: number;
  isDeposit: boolean;
}
