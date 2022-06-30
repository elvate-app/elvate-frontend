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

export function usePairsSubscribed():
  | ElvatePair.PairStructOutput[]
  | undefined {
  const pairs = usePairs();
  const subs = useSubscriptionsFromAccount();

  const filtered = useMemo(
    () => new Map([...(subs || [])].filter((value) => value[1].length > 0)),
    [subs]
  );

  return useMemo(
    () =>
      pairs?.filter((pair) =>
        [...filtered.keys()].includes(pair.id.toString())
      ),
    [filtered, pairs]
  );
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
