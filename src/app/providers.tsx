'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { base } from '@dhedge/trading-widget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { injected, metaMask, safe } from 'wagmi/connectors';

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

const config = createConfig({
  chains: [base],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [base.id]: http(),
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <TradingProviders>{children}</TradingProviders>
          </WagmiProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
