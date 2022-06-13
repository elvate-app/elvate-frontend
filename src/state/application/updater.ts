import {
  ContractCallContext,
  ContractCallResults,
} from "ethereum-multicall/dist/esm/models";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ERC20 from "src/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { ELVATE_CORE_ADDRESS } from "src/constants/addresses";
import { Token } from "src/constants/tokens";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { useElvateCoreContract } from "src/hooks/useContract";
import useMulticall from "src/hooks/useMulticall";
import usePairs from "src/hooks/usePairs";
import { useAllDeposit } from "src/hooks/usePortfolio";
import { useAllPrices } from "src/hooks/usePrices";
import useTokenList from "src/hooks/useToken";
import {
  updateOwner,
  updatePairCreationFees,
  updatePrecision,
  updateSwapFees,
  updateTotalValueDeposited,
} from "./actions";

type ApplicationState = {
  swapFees: string | undefined;
  pairCreationFees: string | undefined;
  totalValueDeposited: string | undefined;
  owner: string | undefined;
  precision: string | undefined;
};

export default function Updater(): null {
  const { chainId } = useActiveWeb3React();
  const contract = useElvateCoreContract(false);
  const prices = useAllPrices();
  const deposit = useAllDeposit();
  const [state, setState] = useState<ApplicationState>({
    swapFees: undefined,
    pairCreationFees: undefined,
    totalValueDeposited: undefined,
    owner: undefined,
    precision: undefined,
  });
  const dispatch = useDispatch();
  const allPairs = usePairs();
  const multicall = useMulticall();
  const tokens = useTokenList();

  const updateTotalValueDepositedCallback = useCallback(async () => {
    if (!chainId || !prices || !allPairs || !multicall || !tokens)
      return undefined;

    const context = tokens.reduce(
      (a: ContractCallContext[], token: Token) => [
        ...a,
        {
          reference: token.address,
          contractAddress: token.address,
          abi: ERC20.abi,
          calls: [
            {
              reference: token.address,
              methodName: "balanceOf",
              methodParameters: [ELVATE_CORE_ADDRESS],
            },
          ],
        },
      ],
      []
    );

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

    const res = tokens.reduce(
      (value: number, token: Token) =>
        value +
        Number.parseFloat(
          ethers.utils.formatEther(
            contractCallResult.results[token.address].callsReturnContext[0]
              .returnValues[0]
          )
        ) *
          prices[token.coingeckoId].usd,
      0
    );

    setState((state: ApplicationState) => ({
      ...state,
      totalValueDeposited: res.toFixed(2),
    }));
  }, [allPairs, chainId, multicall, prices, setState, tokens]);

  const updateFeesCallback = useCallback(async () => {
    const [swapFees, pairCreationFees, owner, precision] = await Promise.all([
      contract.swapFees(),
      contract.pairCreationFees(),
      contract.owner(),
      contract.precision(),
    ]);
    setState((state: ApplicationState) => {
      return {
        ...state,
        swapFees: ethers.utils.formatEther(swapFees),
        pairCreationFees: ethers.utils.formatEther(pairCreationFees),
        owner: owner,
        precision: precision.toString(),
      };
    });
  }, [contract, setState]);

  useEffect(() => {
    updateTotalValueDepositedCallback();
    updateFeesCallback();
  }, [deposit, updateTotalValueDepositedCallback, updateFeesCallback]);

  useEffect(() => {
    dispatch(updateTotalValueDeposited(state.totalValueDeposited));
  }, [dispatch, state.totalValueDeposited]);

  useEffect(() => {
    dispatch(updatePairCreationFees(state.pairCreationFees));
  }, [dispatch, state.pairCreationFees]);

  useEffect(() => {
    dispatch(updateSwapFees(state.swapFees));
  }, [dispatch, state.swapFees]);

  useEffect(() => {
    dispatch(updateOwner(state.owner));
  }, [dispatch, state.owner]);

  useEffect(() => {
    dispatch(updatePrecision(state.precision));
  }, [dispatch, state.precision]);

  return null;
}
