import { Text, Image, Flex, Link } from '@chakra-ui/react';
import { base } from '@dhedge/trading-widget';
import { useEffect, useMemo, useState } from 'react';
import { useChainId, useChains } from 'wagmi';

import { SYNTHETIX_VAULT, SynthetixVaultConfig } from '~/lib/utils/constant';

const Header = () => {
  const chainId = useChainId();
  const [vaultConfig, setVaultConfig] = useState(SYNTHETIX_VAULT[base.id]);

  useEffect(() => {
    if (!!vaultConfig && vaultConfig.chainId === chainId) return;
    setVaultConfig(SYNTHETIX_VAULT[chainId ?? base.id]);
  }, [chainId, vaultConfig]);

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      direction={['column', 'column', 'row']}
    >
      <Flex direction={['column', 'row']} gap={3.5} alignItems="center">
        <Image src="/synthetix.svg" alt="Synthetix" height="20px" />
        <Flex mx={['auto', 'none']} alignItems="center">
          <Text ml={0} mr={3} opacity="0.75" fontSize="sm">
            on
          </Text>
          <Image
            src={vaultConfig.logo}
            alt={vaultConfig.chainName}
            height="24px"
            opacity={0.9}
            filter="grayscale(100%)"
          />
          <Text ml={1} fontSize="xl" color="gray.300">
            {vaultConfig.chainName.toUpperCase()}
          </Text>
        </Flex>
      </Flex>
      <Flex ml={['none', 'none', 'auto']} gap={10} mt={[6, 6, 0]}>
        <Link
          borderBottom="1px solid"
          borderColor="gray.700"
          pb={0.5}
          color="gray.300"
          _hover={{ color: 'gray.100', borderColor: 'gray.500' }}
          fontSize="sm"
          fontWeight="medium"
          letterSpacing="0.2rem"
          textTransform="uppercase"
          href="https://v3.kwenta.io"
        >
          Trade
        </Link>
        <Link
          borderBottom="1px solid"
          borderColor="gray.700"
          pb={0.5}
          color="gray.300"
          _hover={{ color: 'gray.100', borderColor: 'gray.500' }}
          fontSize="sm"
          fontWeight="medium"
          letterSpacing="0.2rem"
          textTransform="uppercase"
          href="https://liquidity.synthetix.eth.limo"
        >
          Provide Liquidity
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
