import { useWeb3React } from "@web3-react/core";
import { ContractCallResults } from "ethereum-multicall";
import { CallContext } from "ethereum-multicall/dist/esm/models";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Token } from "src/constants/tokens";
import ElvateContract from "src/artifacts/contracts/ElvateCore.sol/ElvateCore.json";
import ERC20 from "src/contracts/ERC20.json";
import { useElvateCoreContract } from "src/hooks/useContract";
import { useAllTokens } from "src/hooks/useCustomTokens";
import useDebounce from "src/hooks/useDebounce";
import useMulticall from "src/hooks/useMulticall";
import { updateBalance, updateDeposit } from "./actions";
import { MapTokenValue } from "./reducer";

type PortfolioState = {
  deposit: MapTokenValue | undefined;
  balance: MapTokenValue | undefined;
  timestamp: number;
};

export default function Updater(): null {
  const { account, library } = useWeb3React();
  const coreContract = useElvateCoreContract(true);
  const dispatch = useDispatch();
  const tokens = useAllTokens();
  const multicall = useMulticall();
  const [state, setState] = useState<PortfolioState>({
    deposit: undefined,
    balance: undefined,
    timestamp: 0,
  });

  const depositFilter = useMemo(
    () =>
      library
        ? coreContract?.filters.TokenDeposited(account, null) ?? undefined
        : undefined,
    [account, coreContract, library]
  );

  const withdrewFilter = useMemo(
    () =>
      library
        ? coreContract.filters.TokenWithdrawal(account, null) ?? undefined
        : undefined,
    [account, coreContract, library]
  );

  const pairTriggeredFilter = useMemo(
    () => coreContract?.filters.PairTriggered() ?? undefined,
    [coreContract]
  );

  const updateLastEventTimestamp = useCallback(
    (owner: string, amount: BigNumber) => {
      if (!library) return;
      const blockNumber = new Date().getTime();
      setState((state) => {
        return { ...state, timestamp: blockNumber };
      });
    },
    [setState, library]
  );

  const debouncedState = useDebounce(state, 800);

  const updateDepositCallback = useCallback(async () => {
    if (!coreContract || !account || !multicall) return;

    const calls = tokens.reduce(
      (a: CallContext[], token: Token) => [
        ...a,
        {
          reference: token.address,
          methodName: "getDepositedToken",
          methodParameters: [account, token.address],
        },
      ],
      []
    );

    const context = {
      reference: "deposit",
      contractAddress: coreContract.address,
      abi: ElvateContract.abi,
      calls: calls,
    };

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

    console.log(contractCallResult);

    let map: MapTokenValue = {};
    tokens.map((token: Token) => {
      const tokenRes = contractCallResult.results[
        "deposit"
      ].callsReturnContext.find((value) => value.reference === token.address);

      if (tokenRes !== undefined) {
        map[token.address] = BigNumber.from(tokenRes.returnValues[0].hex);
      }
    });

    setState((state) => {
      return { ...state, deposit: map };
    });
  }, [account, coreContract, multicall, setState, tokens]);

  const updateBalanceCallback = useCallback(async () => {
    if (!coreContract || !account || !multicall) return;

    const context = tokens.reduce(
      (a: any, v: Token) => [
        ...a,
        {
          reference: v.symbol,
          contractAddress: v.address,
          abi: ERC20.abi,
          calls: [
            {
              reference: "balanceOf",
              methodName: "balanceOf",
              methodParameters: [account],
            },
          ],
        },
      ],
      []
    );

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

    let map: MapTokenValue = {};
    tokens.map((token: Token) => {
      map[token.address] = BigNumber.from(
        contractCallResult.results[token.symbol].callsReturnContext[0]
          .returnValues[0].hex
      );
    });

    setState((state) => {
      return { ...state, balance: map };
    });
  }, [account, coreContract, multicall, tokens]);

  useEffect(() => {
    setState({
      deposit: undefined,
      balance: undefined,
      timestamp: 0,
    });
  }, [account]);

  useEffect(() => {
    updateDepositCallback();
    updateBalanceCallback();
  }, [
    debouncedState.timestamp,
    updateDepositCallback,
    updateBalanceCallback,
    tokens,
  ]);

  useEffect(() => {
    if (!depositFilter || !withdrewFilter || !pairTriggeredFilter) return;

    coreContract.on(depositFilter, updateLastEventTimestamp);
    coreContract.on(withdrewFilter, updateLastEventTimestamp);
    coreContract.on(pairTriggeredFilter, updateLastEventTimestamp);

    return () => {
      coreContract.removeListener(depositFilter);
      coreContract.removeListener(withdrewFilter);
      coreContract.removeListener(pairTriggeredFilter);
    };
  }, [
    coreContract,
    depositFilter,
    withdrewFilter,
    pairTriggeredFilter,
    updateLastEventTimestamp,
  ]);

  useEffect(() => {
    dispatch(updateDeposit(debouncedState.deposit));
  }, [dispatch, debouncedState.deposit]);

  useEffect(() => {
    dispatch(updateBalance(debouncedState.balance));
  }, [dispatch, debouncedState.balance]);

  return null;
}
