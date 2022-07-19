import { BigNumber } from "ethers";
import { ElvatePair } from "src/types/v1/ElvateCore";

export const getPairById = (
  pairId: BigNumber | undefined,
  allPairs: ElvatePair.PairStructOutput[] | undefined
): ElvatePair.PairStructOutput | undefined => {
  if (!pairId || !allPairs) return undefined;
  return allPairs.find((pair: ElvatePair.PairStructOutput) =>
    pair.id.eq(pairId)
  );
};
