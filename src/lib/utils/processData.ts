/* eslint-disable no-console */
import { ethers } from 'ethers';

// Define the ProcessedData type
export interface ProcessedData {
  processedData: {
    walletAddress: string;
    feesPaid: number;
    estimatedDistribution: number;
  };
  totalSnxDistribution: number;
}

const perpsMarketProxyABI = [
  {
    constant: true,
    inputs: [{ name: '_accountId', type: 'uint128' }],
    name: 'getAccountOwner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
const perpsMarketProxyAddress = '0x0A2AF931eFFd34b81ebcc57E3d3c9B1E1dE1C9Ce'; // base mainnet

const multicallAddress = '0xcA11bde05977b3631167028862bE2a173976CA11';
const multicallABI = [
  {
    constant: true,
    inputs: [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'callData', type: 'bytes' },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', type: 'uint256' },
      { name: 'returnData', type: 'bytes[]' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_BASE_RPC_URL
);
const perpsMarketProxy = new ethers.Contract(
  perpsMarketProxyAddress,
  perpsMarketProxyABI,
  provider
);
const multicall = new ethers.Contract(multicallAddress, multicallABI, provider);

interface FetchedData {
  account_id: number;
  day: string; // Assuming it's an ISO 8601 timestamp string
  exchange_fees: number;
}

const FEE_PERCENTAGE = 0.9;

export const processData = async (
  fetchedData: FetchedData[],
  snxPrice: number
): Promise<object> => {
  const accountOwnerCache: { [accountId: string]: string } = {};

  const getWalletAddresses = async (accountIds: number[]): Promise<void> => {
    const calls = accountIds.map((accountId) => ({
      target: perpsMarketProxyAddress,
      callData: perpsMarketProxy.interface.encodeFunctionData(
        'getAccountOwner',
        [accountId]
      ),
    }));

    const { returnData } = await multicall.aggregate(calls);

    accountIds.forEach((accountId, index) => {
      try {
        const [owner] = perpsMarketProxy.interface.decodeFunctionResult(
          'getAccountOwner',
          returnData[index]
        );
        accountOwnerCache[accountId] = owner;
      } catch (error) {
        console.error(`Error decoding owner for account ${accountId}:`, error);
        accountOwnerCache[accountId] = 'Unknown';
      }
    });
  };

  const uniqueAccountIds = fetchedData.map((data) => data.account_id);

  await getWalletAddresses(uniqueAccountIds);

  const walletData: {
    [walletAddress: string]: {
      feesPaid: number;
      estimatedDistribution: number;
    };
  } = {};

  let totalSnxDistribution = 0;
  fetchedData.forEach((data) => {
    const walletAddress = accountOwnerCache[data.account_id];
    const exchangeFees = Number(data.exchange_fees);

    if (!walletData[walletAddress]) {
      walletData[walletAddress] = { feesPaid: 0, estimatedDistribution: 0 };
    }

    if (!Number.isNaN(exchangeFees)) {
      walletData[walletAddress].feesPaid += exchangeFees;
      const estimatedFeeDistribution = exchangeFees * FEE_PERCENTAGE;
      const snxDistribution = estimatedFeeDistribution / snxPrice;
      totalSnxDistribution += snxDistribution;
      walletData[walletAddress].estimatedDistribution += snxDistribution;
    } else {
      console.error(
        `Invalid exchange fee for account ${data.account_id}:`,
        data.exchange_fees
      );
    }
  });

  return {
    processedData: Object.keys(walletData).map((walletAddress) => ({
      walletAddress,
      feesPaid: walletData[walletAddress].feesPaid,
      estimatedDistribution: walletData[walletAddress].estimatedDistribution,
    })),
    totalSnxDistribution,
  };
};
