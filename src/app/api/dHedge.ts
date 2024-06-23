import type { FundData } from '~/app/api/types';

import requester from './index';

export default function getFundByAddress(address: string) {
  return requester
    .post('/graphql', {
      query:
        'query GetFund($address: String!) {\n' +
        '  fund(address: $address) {\n' +
        '    name\n' +
        '    address\n' +
        '    managerLogicAddress\n' +
        '    tokenPrice\n' +
        '    totalValue\n' +
        '    totalSupply\n' +
        '    performanceFeeNumerator\n' +
        '    streamingFeeNumerator\n' +
        '    entryFeeNumerator\n' +
        '    blockTime\n' +
        '    riskFactor\n' +
        '    referringEnabled\n' +
        '    performanceMetrics {\n' +
        '      day\n' +
        '      week\n' +
        '      month\n' +
        '      quarter\n' +
        '      halfyear\n' +
        '      year\n' +
        '    }\n' +
        '    isPrivate\n' +
        '    fundComposition {\n' +
        '      tokenName\n' +
        '      tokenAddress\n' +
        '      amount\n' +
        '      rate\n' +
        '      isDeposit\n' +
        '      precision\n' +
        '      asset {\n' +
        '        iconSymbols\n' +
        '      }\n' +
        '    }\n' +
        '    apy {\n' +
        '      monthly\n' +
        '      weekly\n' +
        '    }\n' +
        '  }\n' +
        '}\n',
      variables: { address },
      operationName: 'GetFund',
    })
    .then((res) => res?.data?.data?.fund as FundData);
}
