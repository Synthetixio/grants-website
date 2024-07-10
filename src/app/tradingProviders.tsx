'use client';

import type {
  PoolConfig,
  TradingPanelContextConfig,
} from '@dhedge/trading-widget';
import { base, TradingPanelProvider } from '@dhedge/trading-widget';
import { useMemo } from 'react';
import { useChainId } from 'wagmi';

import { DEPOSIT_TOKEN, SYNTHETIX_VAULT } from '~/lib/utils/constant';

const SYNTHETIX_BASE: PoolConfig = {
  chainId: base.id,
  symbol: 'sUSDCy',
  address: SYNTHETIX_VAULT[base.id],
  depositParams: {
    customTokens: [DEPOSIT_TOKEN[base.id]],
  },
  withdrawParams: {
    customTokens: [],
  },
};

const SIMPLE_INITIAL_STATE: TradingPanelContextConfig['initialState'] = {
  poolConfigMap: {
    [SYNTHETIX_BASE.address]: SYNTHETIX_BASE,
  },
  poolAddress: '',
};

const SIMPLE_ACTIONS: TradingPanelContextConfig['actions'] = {
  onTransactionError: (...args) => {
    console.log({
      onTransactionError: args,
    });
  },
  onTransactionSuccess: (...args) => {
    console.log({
      onTransactionSuccess: args,
    });
  },
  onTransactionEstimationError: (...args) => {
    /** Using of alert notification with tx error data is highly recommended */
    console.log({
      onTransactionEstimationError: args,
    });
  },
  onTokenSelector: (...args) => {
    console.log({
      onTokenSelector: args,
    });
  },
  onLog: (...args) => {
    console.log({
      onLog: args,
    });
  },
  onSimulateTransaction: (...args) => {
    console.log({
      onSimulateTransaction: args,
    });

    return Promise.resolve(null);
  },
  onSetTradingType: (...args) => {
    console.log({
      onSetTradingType: args,
    });
  },
};

const TradingProviders = ({ children }: { children: React.ReactNode }) => {
  const chainId = useChainId();
  const poolAddress = useMemo(
    () => (chainId ? SYNTHETIX_VAULT[chainId] : SYNTHETIX_BASE.address),
    [chainId]
  );

  return (
    <TradingPanelProvider
      initialState={{
        ...SIMPLE_INITIAL_STATE,
        poolAddress,
      }}
      actions={SIMPLE_ACTIONS}
    >
      {children}
    </TradingPanelProvider>
  );
};

export default TradingProviders;
