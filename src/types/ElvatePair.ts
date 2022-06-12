import { BigNumber } from "ethers";

interface ElvatePair {
  id: BigNumber;
  lastPaidAt: BigNumber;
  tokenIn: string;
  tokenOut: string;
  subs: Array<string>;
}

export default ElvatePair;
