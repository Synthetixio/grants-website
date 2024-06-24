'use client';

/** Replace by commented imports while using example */
import type { ProvidersProps } from '@dhedge/trading-widget';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TradingWidget } from '@dhedge/trading-widget';

const SIMPLE_WIDGET_CONFIG: ProvidersProps = {
  config: {
    actions: {
      onConnect: () => {
        /** process any kind of operation (e.g. open Rainbowkit modal) to make sure wagmi's 'useAccount().account' could return connected wallet address in the end */
        console.log('connect');
      },
    },
  },
};

const LiquidityWidget = () => (
  <TradingWidget {...SIMPLE_WIDGET_CONFIG} suppressHydrationWarning />
);

export default LiquidityWidget;
