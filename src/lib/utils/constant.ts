import type { TradingToken } from '@dhedge/trading-widget';
import {
  arbitrum,
  base,
  USDC_ARBITRUM,
  USDC_BASE,
} from '@dhedge/trading-widget';

export const QUERY_KEYS = {
  GET_SYNTHETIX_VAULT: 'GET_SYNTHETIX_VAULT',
};

export const SYNTHETIX_VAULT: { [chainId: number]: SynthetixVaultConfig } = {
  [base.id]: {
    chainId: base.id,
    chainName: 'Base',
    name: 'Toros Synthetix USDC Andromeda Yield Vault',
    address: '0xc1e02884af4a283ca25ab63c45360d220d69da52',
    logo: '/base.svg',
    url: 'https://toros.finance/synthetix-usdc-andromeda-yield',
    depositTokens: [USDC_BASE],
  },
  [arbitrum.id]: {
    chainId: arbitrum.id,
    chainName: 'Arbitrum',
    name: 'Synthetix USD Yield',
    address: '0xc3198eb5102fb3335c0e911ef1da4bc07e403dd1',
    logo: '/arbitrum.svg',
    url: 'https://toros.finance/synthetix-usd-yield',
    depositTokens: [USDC_ARBITRUM],
  },
};

export interface SynthetixVaultConfig {
  chainId: number;
  chainName: string;
  name: string;
  address: string;
  logo: string;
  url: string;
  depositTokens: TradingToken[];
}
