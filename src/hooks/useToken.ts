import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import {
  NETWORK_MATIC_MUMBAI_TESTNET,
  NETWORK_BSCT,
} from "src/constants/chain";
import { pmt, bsct, unknown } from "src/constants/tokens";

export const useTokenList = () => {
  const { chainId } = useWeb3React();

  return useMemo(() => {
    if (!chainId) return pmt;

    switch (chainId) {
      case NETWORK_MATIC_MUMBAI_TESTNET:
        return pmt;
      case NETWORK_BSCT:
        return bsct;
      default:
        return pmt;
    }
  }, [chainId]);
};

export const useDefaultToken = (id: 0 | 1) => {
  const tokens = useTokenList();

  if (tokens.length < 2) return unknown;

  return tokens[id];
};

export default useTokenList;
