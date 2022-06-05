import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { useElvateSubscriptionContract } from "src/hooks/useContract";
import ElvateSubscription from "src/types/ElvateSubscription";
import { getContractCall } from "src/utils/getContractCall";
import { updateElvateSubscriptions } from "./actions";

type SubscriptionState = {
  subscriptions: ElvateSubscription[] | null;
};

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();
  const subscriptionContract = useElvateSubscriptionContract(false);

  const [state, setState] = useState<SubscriptionState>({
    subscriptions: null,
  });

  const onElvateSubscriptionCreated = useCallback(
    (elvateSubscription: ElvateSubscription) => {
      setState((state: any) => {
        if (!state.subscriptions) return state;
        if (
          state.subscriptions.filter(
            (sub: ElvateSubscription) =>
              sub.owner === elvateSubscription.owner &&
              sub.pairId.eq(elvateSubscription.pairId)
          ).length > 0
        )
          return state;

        const newSubscriptions: ElvateSubscription[] = [
          ...state.subscriptions,
          elvateSubscription,
        ];

        return {
          subscriptions: newSubscriptions,
        };
      });
    },
    [setState]
  );

  const onElvateSubscriptionEdited = useCallback(
    (elvateSubscription: ElvateSubscription) => {
      setState((state: any) => {
        if (!state.subscriptions) return state;
        const index = state.subscriptions.findIndex(
          (sub: ElvateSubscription) =>
            sub.owner === elvateSubscription.owner &&
            sub.pairId.eq(elvateSubscription.pairId)
        );

        if (index < 0) return state;
        if (elvateSubscription.amountIn.eq(state.subscriptions[index].amountIn))
          return state;

        const filteredSubscriptions: ElvateSubscription[] =
          state.subscriptions.filter(
            (sub: ElvateSubscription) =>
              !(
                sub.owner === elvateSubscription.owner &&
                sub.pairId.eq(elvateSubscription.pairId)
              )
          );

        return {
          subscriptions: [...filteredSubscriptions, elvateSubscription],
        };
      });
    },
    [setState]
  );

  const init = useCallback(async () => {
    const res: ElvateSubscription[] = await getContractCall(
      subscriptionContract,
      "getAllSubscriptions"
    );
    setState({ subscriptions: res });
  }, [subscriptionContract]);

  // attach/detach listeners
  useEffect(() => {
    setState({ subscriptions: null });

    if (!library || !chainId || !subscriptionContract) return undefined;

    init();

    subscriptionContract.on("SubscriptionCreated", onElvateSubscriptionCreated);
    subscriptionContract.on("SubscriptionEdited", onElvateSubscriptionEdited);

    return () => {
      subscriptionContract.removeListener("SubscriptionCreated");
      subscriptionContract.removeListener("SubscriptionEdited");
    };
  }, [
    library,
    chainId,
    subscriptionContract,
    init,
    onElvateSubscriptionCreated,
    onElvateSubscriptionEdited,
  ]);

  useEffect(() => {
    if (!state.subscriptions) return;
    dispatch(updateElvateSubscriptions(state.subscriptions));
  }, [dispatch, state.subscriptions]);

  return null;
}
