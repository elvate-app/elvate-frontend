import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "src/state";
import ElvateSubscription from "src/types/ElvateSubscription";

export function useSubscriptions(): ElvateSubscription[] | null {
  return useSelector(
    (state: AppState) => state.subscriptions.elvateSubscriptions,
    shallowEqual
  );
}

export function useSubscriptionsFromAccount(): ElvateSubscription[] | null {
  const { account } = useWeb3React();
  const allSubscriptions: ElvateSubscription[] | null = useSelector(
    (state: AppState) => state.subscriptions.elvateSubscriptions
  );

  const filteredListSubscriptions = useMemo(() => {
    if (!allSubscriptions) return [];
    return allSubscriptions.filter((sub) => sub.owner === account);
  }, [allSubscriptions, account]);

  if (!allSubscriptions || !account) return null;

  return filteredListSubscriptions;
}

export function useSubscriptionsFromPair(
  pairId: BigNumber
): ElvateSubscription[] | null {
  const allSubscriptions: ElvateSubscription[] | null = useSelector(
    (state: AppState) => state.subscriptions.elvateSubscriptions
  );

  const filteredListSubscriptions = useMemo(() => {
    if (!allSubscriptions) return [];
    return allSubscriptions.filter((sub) => sub.pairId.eq(pairId));
  }, [allSubscriptions, pairId]);

  if (!allSubscriptions) return null;

  return filteredListSubscriptions;
}

export function useSubscription(pairId: BigNumber): ElvateSubscription | null {
  const { account } = useWeb3React();
  const subscriptions = useSubscriptionsFromAccount();
  if (!account) return null;

  return subscriptions?.filter((sub) => sub.pairId.eq(pairId))[0] ?? null;
}

export function useIsSubscribed(pairId: BigNumber): boolean | undefined {
  const listSubscriptions = useSubscriptionsFromAccount();

  if (!listSubscriptions) return undefined;
  const filteredListSubscription = listSubscriptions.filter((sub) =>
    sub.pairId.eq(pairId)
  );

  return filteredListSubscription.length > 0;
}

export default useSubscriptions;
