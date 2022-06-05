import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useMemo } from "react";
import ElvateCore from "src/artifacts/contracts/ElvateCore.sol/ElvateCore.json";
import ElvatePair from "src/artifacts/contracts/ElvatePair.sol/ElvatePair.json";
import ElvateSubscription from "src/artifacts/contracts/ElvateSubscription.sol/ElvateSubscription.json";
import {
  ELVATE_CORE_ADDRESS,
  ELVATE_PAIR_ADDRESS,
  ELVATE_SUBSCRIPTION_ADDRESS,
} from "src/constants/addresses";
import ERC20 from "src/contracts/ERC20.json";
import { isAddress } from "src/utils/address";
import { simpleRpcProvider } from "src/utils/providers";
import useActiveWeb3React from "./useActiveWeb3React";

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string | undefined | null
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: any,
  signer?: ethers.Signer | ethers.providers.Provider
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer ?? simpleRpcProvider);
}

export function getTokenContract(
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ERC20.abi, signer ?? simpleRpcProvider);
}

function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) return null;
    try {
      return getContract(
        address,
        ABI,
        withSignerIfPossible ? getProviderOrSigner(library, account) : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account, chainId]) as T;
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
) {
  return useContract<Contract>(
    isAddress(tokenAddress) ? tokenAddress : undefined,
    ERC20.abi,
    withSignerIfPossible
  );
}

export function useElvateCoreContract(withSignerIfPossible?: boolean) {
  return useContract<any>(
    ELVATE_CORE_ADDRESS,
    ElvateCore.abi,
    withSignerIfPossible
  );
}

export function useElvateSubscriptionContract(withSignerIfPossible?: boolean) {
  return useContract<any>(
    ELVATE_SUBSCRIPTION_ADDRESS,
    ElvateSubscription.abi,
    withSignerIfPossible
  );
}

export function useElvatePairContract(withSignerIfPossible?: boolean) {
  return useContract<any>(
    ELVATE_PAIR_ADDRESS,
    ElvatePair.abi,
    withSignerIfPossible
  );
}
