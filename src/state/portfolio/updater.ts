import ElvateCoreJson from "@elvate/v1-core/artifacts/contracts/ElvateCore.sol/ElvateCore.json";
import ERC20Json from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { useWeb3React } from "@web3-react/core";
import { ContractCallResults } from "ethereum-multicall";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Token } from "src/constants/tokens";
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
  const contract = useElvateCoreContract(true);
  const dispatch = useDispatch();
  const tokens = useAllTokens();
  const multicall = useMulticall();
  const [state, setState] = useState<PortfolioState>({
    deposit: undefined,
    balance: undefined,
    timestamp: 0,
  });

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
    if (!contract || !account || !multicall) return;

    const calls = tokens.map((token: Token) => ({
      reference: token.address,
      methodName: "depositByOwnerByToken",
      methodParameters: [account, token.address],
    }));

    const context = {
      reference: "deposit",
      contractAddress: contract.address,
      abi: ElvateCoreJson.abi,
      calls: calls,
    };

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

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
  }, [account, contract, multicall, setState, tokens]);

  const updateBalanceCallback = useCallback(async () => {
    if (!contract || !account || !multicall) return;

    const context = tokens.reduce(
      (a: any, v: Token) => [
        ...a,
        {
          reference: v.symbol,
          contractAddress: v.address,
          abi: ERC20Json.abi,
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
  }, [account, contract, multicall, tokens]);

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
    if (!contract || !updateLastEventTimestamp) return;

    contract.on("TokenDeposited", updateLastEventTimestamp);
    contract.on("TokenWithdrawal", updateLastEventTimestamp);
    contract.on("PairTriggered", updateLastEventTimestamp);

    return () => {
      contract.removeListener("TokenDeposited", updateLastEventTimestamp);
      contract.removeListener("TokenWithdrawal", updateLastEventTimestamp);
      contract.removeListener("PairTriggered", updateLastEventTimestamp);
    };
  }, [contract, updateLastEventTimestamp]);

  useEffect(() => {
    dispatch(updateDeposit(debouncedState.deposit));
  }, [dispatch, debouncedState.deposit]);

  useEffect(() => {
    dispatch(updateBalance(debouncedState.balance));
  }, [dispatch, debouncedState.balance]);

  return null;
}
