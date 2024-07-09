import {
  arbitrum,
  base,
  USDC_ARBITRUM,
  USDC_BASE,
} from '@dhedge/trading-widget';

export const QUERY_KEYS = {
  GET_SYNTHETIX_VAULT: 'GET_SYNTHETIX_VAULT',
};

export const SYNTHETIX_VAULT: { [chainId: number]: string } = {
  [base.id]: '0xc1e02884af4a283ca25ab63c45360d220d69da52',
  [arbitrum.id]: '0xc3198eb5102fb3335c0e911ef1da4bc07e403dd1',
};

export const DEPOSIT_TOKEN = {
  [base.id]: USDC_BASE,
  [arbitrum.id]: USDC_ARBITRUM,
};
