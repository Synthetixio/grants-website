import { Text, Image, Flex, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      direction={['column', 'column', 'row']}
    >
      <Flex direction={['column', 'row']} gap={3.5}>
        <Image src="/synthetix.svg" alt="Synthetix" height="20px" />
        <Flex mx={['auto', 'none']}>
          <Text ml={0} mr={3} opacity="0.75" fontSize="sm">
            on
          </Text>
          <Image src="/base.svg" alt="Base" height="20px" opacity={0.9} />
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
