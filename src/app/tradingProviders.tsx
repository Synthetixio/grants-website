'use client';

import type {
  PoolConfig,
  TradingPanelContextConfig,
} from '@dhedge/trading-widget';
import { arbitrum, base, TradingPanelProvider } from '@dhedge/trading-widget';
import { useEffect, useMemo, useState } from 'react';
import { useChainId } from 'wagmi';

import { SYNTHETIX_VAULT } from '~/lib/utils/constant';

const SYNTHETIX_BASE: PoolConfig = {
  chainId: base.id,
  symbol: 'sUSDCy',
  address: SYNTHETIX_VAULT[base.id].address,
  depositParams: {
    method: 'depositWithCustomCooldown',
    customTokens: SYNTHETIX_VAULT[base.id].depositTokens,
  },
  withdrawParams: {
    customTokens: [],
  },
};

const SYNTHETIX_ARBITRUM: PoolConfig = {
  chainId: arbitrum.id,
  symbol: 'sUSDCy',
  address: SYNTHETIX_VAULT[arbitrum.id].address,
  depositParams: {
    method: 'depositWithCustomCooldown',
    customTokens: SYNTHETIX_VAULT[arbitrum.id].depositTokens,
  },
  withdrawParams: {
    customTokens: [],
  },
};

const SIMPLE_INITIAL_STATE: TradingPanelContextConfig['initialState'] = {
  poolConfigMap: {
    [SYNTHETIX_BASE.address]: SYNTHETIX_BASE,
    [SYNTHETIX_ARBITRUM.address]: SYNTHETIX_ARBITRUM,
  },
  poolAddress: SYNTHETIX_BASE.address,
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
    () => (chainId ? SYNTHETIX_VAULT[chainId].address : SYNTHETIX_BASE.address),
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
