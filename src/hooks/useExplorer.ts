import { useMemo } from "react";
import {
  NETWORK_BSCT,
  NETWORK_MATIC_MUMBAI_TESTNET,
} from "src/constants/chain";
import { explorer } from "src/constants/explorer";
import useActiveWeb3React from "./useActiveWeb3React";

export function useExplorer(): string {
  const { chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!chainId) return "";

    switch (chainId) {
      case NETWORK_MATIC_MUMBAI_TESTNET:
        return explorer[NETWORK_MATIC_MUMBAI_TESTNET].url;
      case NETWORK_BSCT:
        return explorer[NETWORK_BSCT].url;
      default:
        return "";
    }
  }, [chainId]);
}
