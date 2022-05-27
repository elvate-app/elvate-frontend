import { BigNumber } from "ethers";

interface ElvatePair {
  id: BigNumber;
  lastPaidAt: BigNumber;
  tokenIn: string;
  tokenOut: string;
}

export default ElvatePair;
