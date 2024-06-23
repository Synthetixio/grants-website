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
  [arbitrum.id]: '0xf715724abba480d4d45f4cb52bef5ce5e3513ccc',
};

export const DEPOSIT_TOKEN = {
  [base.id]: USDC_BASE,
  [arbitrum.id]: USDC_ARBITRUM,
};
