'use client';

import type { ProvidersProps } from '@dhedge/trading-widget';
import { TradingWidget } from '@dhedge/trading-widget';
import dynamic from 'next/dynamic';

const Widget = dynamic(
  () => import('@dhedge/trading-widget').then(() => TradingWidget),
  {
    ssr: false,
  }
);

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

const LiquidityWidget = () => {
  return <Widget {...SIMPLE_WIDGET_CONFIG} />;
};

export default LiquidityWidget;
