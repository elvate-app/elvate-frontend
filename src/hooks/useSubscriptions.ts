import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "src/state";
import { ElvateSubscriptions } from "src/state/subscriptions/reducer";
import { ElvatePair } from "src/types/v1/ElvateCore";

export function useSubscriptions(): ElvateSubscriptions | null {
  return useSelector(
    (state: AppState) => state.subscriptions.elvateSubscriptions
  );
}

export function useSubscriptionsFromAccount(): ElvateSubscriptions | undefined {
  const { account } = useWeb3React();
  const subs = useSubscriptions();

  return useMemo(
    () =>
      new Map(
        Array.from(subs || []).map((value) => [
          value[0],
          value[1].filter((sub) => sub.owner === account),
        ])
      ),
    [account, subs]
  );
}

export function useSubscriptionsFromPair(
  pairId: BigNumber
): ElvatePair.SubStructOutput[] | undefined {
  const subs = useSubscriptions();
  return subs?.get(pairId.toString());
}

export function useSubscription(
  pairId: BigNumber
): ElvatePair.SubStructOutput | undefined {
  const subs = useSubscriptionsFromAccount();
  return subs?.get(pairId.toString())?.[0];
}

export function useIsSubscribed(pairId: BigNumber): boolean | undefined {
  const sub = useSubscription(pairId);
  return !!sub;
}

export default useSubscriptions;
