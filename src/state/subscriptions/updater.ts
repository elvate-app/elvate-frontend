import ElvateCoreJson from "@elvate/v1-core/artifacts/contracts/ElvateCore.sol/ElvateCore.json";
import { ContractCallResults } from "ethereum-multicall/dist/esm/models";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { useElvateCoreContract } from "src/hooks/useContract";
import useMulticall from "src/hooks/useMulticall";
import usePairs from "src/hooks/usePairs";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { updateElvateSubscriptions } from "./actions";
import { ElvateSubscriptions } from "./reducer";

type SubscriptionState = {
  subscriptions: ElvateSubscriptions | null;
};

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();
  const contract = useElvateCoreContract(false);
  const pairs = usePairs();
  const multicall = useMulticall();

  const [state, setState] = useState<SubscriptionState>({
    subscriptions: null,
  });

  const fetchAllSubscriptions = useCallback(async () => {
    if (!contract || !multicall || !pairs) return;

    const calls = pairs.map((pair) => ({
      reference: pair.id.toString(),
      methodName: "getSubs",
      methodParameters: [pair.tokenIn, pair.tokenOut],
    }));

    const context = {
      reference: "subs",
      contractAddress: contract.address,
      abi: ElvateCoreJson.abi,
      calls: calls,
    };

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

    const allSubs: ElvateSubscriptions = new Map(
      contractCallResult.results.subs.callsReturnContext.map(
        (callReturnContext) => {
          return [
            callReturnContext.reference,
            callReturnContext.returnValues.map((value) => ({
              ...[BigNumber.from(value[0]), value[1]],
              amountIn: BigNumber.from(value[0]),
              owner: value[1],
            })),
          ];
        }
      )
    );

    setState({ subscriptions: allSubs });
  }, [contract, multicall, pairs]);

  const onElvateSubEdited = useCallback(
    async (pairId: BigNumber, owner: string, amountIn: BigNumber) => {
      setState((state) => {
        const newSub = {
          ...[amountIn, owner],
          amountIn: amountIn,
          owner: owner,
        } as ElvatePair.SubStructOutput;

        if (!state.subscriptions) return { ...state };

        const newSubs = [
          ...(state.subscriptions
            .get(pairId.toString())
            ?.filter((sub) => sub.owner !== owner) || []),
          newSub,
        ];

        const res = new Map([...state.subscriptions]);
        res.set(pairId.toString(), newSubs);

        return { subscriptions: res };
      });
    },
    [setState]
  );

  // attach/detach listeners
  useEffect(() => {
    setState({ subscriptions: null });

    if (!library || !chainId || !contract || !pairs) return undefined;

    fetchAllSubscriptions();

    contract.on("SubEdited", onElvateSubEdited);

    return () => {
      contract.removeListener("SubEdited", onElvateSubEdited);
    };
  }, [
    library,
    chainId,
    contract,
    fetchAllSubscriptions,
    onElvateSubEdited,
    pairs,
  ]);

  useEffect(() => {
    if (!state.subscriptions) return;
    dispatch(updateElvateSubscriptions(state.subscriptions));
  }, [dispatch, state.subscriptions]);

  return null;
}
