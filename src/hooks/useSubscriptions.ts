import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "src/state";
import { ElvateSubscriptions } from "src/state/subscriptions/reducer";
import { ElvatePair } from "src/types/v1/ElvateCore";

export function useSubs(): ElvateSubscriptions | null {
  return useSelector((state: AppState) => state.subscriptions.subs);
}

export function useEligibleSubs(): ElvateSubscriptions | null {
  return useSelector((state: AppState) => state.subscriptions.eligibleSubs);
}

export function useSubsFromAccount(): ElvateSubscriptions | undefined {
  const { account } = useWeb3React();
  const subs = useSubs();

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

export function useEligibleSubsFromAccount(): ElvateSubscriptions | undefined {
  const { account } = useWeb3React();
  const subs = useEligibleSubs();

  return useMemo(
    () =>
      account
        ? new Map(
            Array.from(subs || []).map((value) => [
              value[0],
              value[1].filter((sub) => sub.owner === account),
            ])
          )
        : undefined,
    [account, subs]
  );
}

export function useSubscriptionsFromPair(
  pairId: BigNumber
): ElvatePair.SubStructOutput[] | undefined {
  const subs = useSubs();
  return subs?.get(pairId.toString());
}

export function useSubscription(
  pairId: BigNumber
): ElvatePair.SubStructOutput | undefined {
  const subs = useSubsFromAccount();
  return subs?.get(pairId.toString())?.[0];
}

export function useIsSubscribed(pairId: BigNumber): boolean | undefined {
  const sub = useSubscription(pairId);
  return !!sub;
}

export default useSubs;
