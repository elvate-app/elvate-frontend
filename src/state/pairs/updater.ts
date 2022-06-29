import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { useElvateCoreContract } from "src/hooks/useContract";
import useDebounce from "src/hooks/useDebounce";
import ElvatePair from "src/types/ElvatePair";
import { updatePairs } from "./actions";

type PairsState = {
  pairs: ElvatePair[] | null;
};

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();
  const contract = useElvateCoreContract(false);

  const [state, setState] = useState<PairsState>({
    pairs: null,
  });

  const onElvatePairCreated = useCallback(
    (id: BigNumber, tokenIn: string, tokenOut: string) => {
      setState((state: any) => {
        if (!state.pairs) return state;
        if (state.pairs.filter((pair: ElvatePair) => pair.id.eq(id)).length > 0)
          return state;

        const newPairs: ElvatePair[] = [
          ...state.pairs,
          {
            id: id,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            lastPaidAt: BigNumber.from(1),
          },
        ];

        return {
          pairs: newPairs,
        };
      });
    },
    [setState]
  );

  const onElvatePairTriggered = useCallback(
    (pairId: BigNumber, lastPaidAt: BigNumber) => {
      setState((state: any) => {
        if (!state.pairs) return state;
        if (
          state.pairs.filter(
            (pair: ElvatePair) =>
              pair.id.eq(pairId) && !pair.lastPaidAt.eq(lastPaidAt)
          ).length <= 0
        )
          return state;

        let newPairs: ElvatePair[] = state.pairs.filter(
          (pair: ElvatePair) => !pair.id.eq(pairId)
        );
        let editedPair: ElvatePair = state.pairs.filter((pair: ElvatePair) =>
          pair.id.eq(pairId)
        )[0];

        editedPair = { ...editedPair, lastPaidAt: lastPaidAt };
        newPairs = [...newPairs, editedPair];

        return {
          pairs: newPairs,
        };
      });
    },
    [setState]
  );

  const fetchAllPairs = useCallback(async () => {
    if (!contract || !library) return;

    const pairs: ElvatePair[] = await contract.getPairs();
    setState((state: PairsState) => {
      return { ...state, pairs: pairs };
    });
  }, [contract, library, setState]);

  const init = useCallback(() => {
    fetchAllPairs();
  }, [fetchAllPairs]);

  // attach/detach listeners
  useEffect(() => {
    setState({ pairs: null });

    if (!library || !chainId || !contract) return undefined;

    init();

    contract.on("PairCreated", onElvatePairCreated);
    contract.on("PairTriggered", onElvatePairTriggered);

    return () => {
      // contract.removeListener("PairCreated");
      // contract.removeListener("PairTriggered");
    };
  }, [
    library,
    chainId,
    contract,
    init,
    onElvatePairCreated,
    onElvatePairTriggered,
  ]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.pairs) return;
    dispatch(updatePairs(debouncedState.pairs));
  }, [dispatch, debouncedState.pairs]);

  return null;
}
