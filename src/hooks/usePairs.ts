import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "src/state";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { useSubscriptionsFromAccount } from "./useSubscriptions";

export function usePairs(): ElvatePair.PairStructOutput[] | undefined {
  return useSelector((state: AppState) => state.pairs.Pairs);
}

export function usePairWithId(
  id: BigNumber
): ElvatePair.PairStructOutput | null {
  const pairs = usePairs();
  return pairs?.filter((pair) => pair.id.eq(id))[0] || null;
}

export function usePairsSubscribed(): ElvatePair.PairStructOutput[] | null {
  const pairs = usePairs();
  const subscriptions = useSubscriptionsFromAccount();

  const filteredPairs = useMemo(() => {
    if (!pairs) return null;
    if (!subscriptions) return [];
    return pairs.filter(
      (pair) => subscriptions.filter((sub) => sub.pairId.eq(pair.id)).length > 0
    );
  }, [pairs, subscriptions]);

  return filteredPairs;
}

export function usePairsNotSubscribed(): ElvatePair.PairStructOutput[] | null {
  const pairs = usePairs();
  const pairsSubscribed = usePairsSubscribed();

  const filteredPairs = useMemo(() => {
    if (!pairs) return null;
    if (!pairsSubscribed) return pairs;
    return pairs.filter((pair) => !pairsSubscribed.includes(pair));
  }, [pairs, pairsSubscribed]);

  return filteredPairs;
}

export default usePairs;
