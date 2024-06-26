'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { arbitrum, base } from '@dhedge/trading-widget';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider } from 'wagmi';

import TradingProviders from '~/app/tradingProviders';
import { Chakra as ChakraProvider } from '~/lib/components/Chakra';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'all',
      refetchOnWindowFocus: false,
    },
  },
});

const config = getDefaultConfig({
  appName: 'Grants Toros UI',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? 'grants-toros-ui',
  chains: [base, arbitrum],
  transports: {
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <RainbowKitProvider theme={darkTheme()}>
              <TradingProviders>{children}</TradingProviders>
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
