import ElvateCoreJson from "@elvate/v1-core/artifacts/contracts/ElvateCore.sol/ElvateCore.json";
import {
  CallContext,
  CallReturnContext,
  ContractCallResults,
} from "ethereum-multicall/dist/esm/models";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { useElvateCoreContract } from "src/hooks/useContract";
import useMulticall from "src/hooks/useMulticall";
import usePairs from "src/hooks/usePairs";
import ElvatePair from "src/types/ElvatePair";
import ElvateSubscription from "src/types/ElvateSubscription";
import { updateElvateSubscriptions } from "./actions";

type SubscriptionState = {
  subscriptions: ElvateSubscription[] | null;
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

  const onElvateSubEdited = useCallback(
    (pairId: BigNumber, owner: string, amountIn: BigNumber) => {
      setState((current: SubscriptionState) => {
        const sub = current.subscriptions?.find(
          (sub: ElvateSubscription) =>
            sub.pairId.eq(pairId) && sub.owner === owner
        );

        if (current.subscriptions !== null && sub !== undefined) {
          if (amountIn.eq(sub.amountIn)) return current;
          // subscription already exist
          return {
            subscriptions: [
              ...current.subscriptions.filter(
                (sub: ElvateSubscription) =>
                  sub.pairId !== pairId && sub.owner !== owner
              ),
              {
                pairId: pairId,
                amountIn: amountIn,
                owner: owner,
              },
            ],
          };
        }

        return {
          subscriptions: [
            ...(current.subscriptions || []),
            {
              pairId: pairId,
              amountIn: amountIn,
              owner: owner,
            },
          ],
        };
      });
    },
    [setState]
  );

  const fetchAllSubscriptions = useCallback(async () => {
    if (!contract || !multicall || !pairs) return;

    const calls = pairs.reduce(
      (a: CallContext[], pair: ElvatePair) => [
        ...a,
        {
          reference: pair.id.toString(),
          methodName: "getSubs",
          methodParameters: [pair.tokenIn, pair.tokenOut],
        },
      ],
      []
    );

    const context = {
      reference: "subs",
      contractAddress: contract.address,
      abi: ElvateCoreJson.abi,
      calls: calls,
    };

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

    const allSubs = contractCallResult.results.subs.callsReturnContext.reduce(
      (subs: Array<ElvateSubscription>, ret: CallReturnContext) => {
        return [
          ...subs,
          ...ret.returnValues.reduce(
            (subs: Array<ElvateSubscription>, sub: any) => {
              return [
                ...subs,
                {
                  pairId: BigNumber.from(ret.reference),
                  amountIn: BigNumber.from(sub[0]),
                  owner: sub[1],
                },
              ];
            },
            []
          ),
        ];
      },
      []
    );

    setState({ subscriptions: allSubs });
  }, [contract, multicall, pairs]);

  // attach/detach listeners
  useEffect(() => {
    setState({ subscriptions: null });

    if (!library || !chainId || !contract || !pairs) return undefined;

    fetchAllSubscriptions();

    contract.on("SubEdited", onElvateSubEdited);

    return () => {
      // contract.removeListener("SubEdited");
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
