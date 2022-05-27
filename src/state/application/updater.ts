import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import tokens, { Token } from "src/constants/tokens";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { getTokenContract, useElvateCoreContract } from "src/hooks/useContract";
import usePairs from "src/hooks/usePairs";
import { useAllDeposit } from "src/hooks/usePortfolio";
import { useAllPrices } from "src/hooks/usePrices";
import { MapTokenValue } from "src/state/portfolio/reducer";
import { getContractCall } from "src/utils/getContractCall";
import { updateTotalValueDeposited } from "./actions";

type ApplicationState = {
  totalValueDeposited: string | undefined;
};

export default function Updater(): null {
  const { chainId } = useActiveWeb3React();
  const contract = useElvateCoreContract(false);
  const prices = useAllPrices();
  const deposit = useAllDeposit();
  const [state, setState] = useState<ApplicationState>({
    totalValueDeposited: undefined,
  });
  const dispatch = useDispatch();
  const allPairs = usePairs();

  const updateTotalValueDepositedCallback = useCallback(async () => {
    if (!contract || !chainId || !prices || !allPairs) return undefined;

    let map: MapTokenValue = {};
    await Promise.all(
      tokens.map(async (token: Token) => {
        const tokenContract = getTokenContract(token.address);

        if (!contract) return;

        map[token.address] = await getContractCall(tokenContract, "balanceOf", [
          contract.address,
        ]);
      })
    );

    const res = tokens
      .reduce((a: number, v: Token) => {
        const tokenValue =
          prices[v.coingeckoId].usd *
          Number.parseFloat(ethers.utils.formatEther(map[v.address]));
        return a + tokenValue;
      }, 0)
      .toFixed(2);

    setState((state: ApplicationState) => ({
      ...state,
      totalValueDeposited: res,
    }));
  }, [allPairs, contract, chainId, prices, setState]);

  useEffect(() => {
    updateTotalValueDepositedCallback();
  }, [deposit, updateTotalValueDepositedCallback]);

  useEffect(() => {
    dispatch(updateTotalValueDeposited(state.totalValueDeposited));
  }, [dispatch, state.totalValueDeposited]);

  return null;
}
