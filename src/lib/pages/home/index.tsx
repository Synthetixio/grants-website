'use client';

import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Link,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { base } from '@dhedge/trading-widget';
import { useQuery } from '@tanstack/react-query';
import { formatEther } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useChainId } from 'wagmi';

import getFundByAddress from '~/app/api/dHedge';
import LiquidityWidget from '~/lib/components/LiquidityWidget';
import { QUERY_KEYS, SYNTHETIX_VAULT } from '~/lib/utils/constant';
import { formatNumber } from '~/lib/utils/format';

const Home = () => {
  const chainId = useChainId();
  const [vaultConfig, setVaultConfig] = useState(SYNTHETIX_VAULT[base.id]);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_SYNTHETIX_VAULT, vaultConfig.address],
    queryFn: () => getFundByAddress(vaultConfig.address),
    retry: 0,
    enabled: !!vaultConfig,
  });

  const tvl = data?.totalValue ? Number(formatEther(data?.totalValue)) : 0;

  useEffect(() => {
    if (!!vaultConfig && vaultConfig.chainId === chainId) return;
    setVaultConfig(SYNTHETIX_VAULT[chainId ?? base.id]);
  }, [chainId, vaultConfig]);

  return (
    <Flex direction="column" w="full">
      <Flex gap={6} direction={['column', 'column', 'row']}>
        <Flex
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={6}
          borderRadius="md"
        >
          <Box my="auto">
            <Heading size="lg" fontWeight="semibold" lineHeight={1.33} mb={4}>
              Provide Liquidity to Synthetix with{' '}
              <Image
                display="inline-block"
                opacity={0.8}
                src="/toros.svg"
                alt="toros"
                height="22px"
                transform="translateY(0.75px)"
              />
            </Heading>
            <Text mb={5}>
              This is an alternative interface for the{' '}
              <Link
                _hover={{ textDecor: 'none', borderColor: 'gray.500' }}
                borderBottom="1px solid"
                borderColor="gray.600"
                href={vaultConfig.url}
                isExternal
              >
                {vaultConfig.name}
              </Link>
              .
            </Text>
            <Heading
              fontWeight="semibold"
              size="sm"
              mb={3}
              borderTop="1px solid"
              borderColor="gray.800"
              pt={3}
            >
              Toros Vault Analytics
            </Heading>
            <StatGroup
              mb={4}
              borderBottom="1px solid"
              borderColor="gray.800"
              pb={2}
            >
              <Stat>
                <StatLabel>APR (1W)</StatLabel>
                <StatNumber>{data?.apy?.weekly ?? '--'}%</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>TVL</StatLabel>
                <StatNumber>${formatNumber(tvl, 0)}</StatNumber>
              </Stat>
            </StatGroup>
            <Text fontSize="sm" color="gray.300">
              Learn more about{' '}
              <Link
                _hover={{ textDecor: 'none', borderColor: 'gray.500' }}
                borderBottom="1px solid"
                borderColor="gray.600"
                href="https://v3.synthetix.io"
              >
                Synthetix
              </Link>
              .
            </Text>
          </Box>
        </Flex>
        <LiquidityWidget />
      </Flex>
    </Flex>
  );
};

export default Home;
