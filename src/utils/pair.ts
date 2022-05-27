import { BigNumber } from "ethers";
import ElvatePair from "src/types/ElvatePair";

export const getPairById = (
  pairId: BigNumber | undefined,
  allPairs: ElvatePair[] | undefined
): ElvatePair | undefined => {
  if (!pairId || !allPairs) return undefined;
  return allPairs.find((pair: ElvatePair) => pair.id.eq(pairId));
};
