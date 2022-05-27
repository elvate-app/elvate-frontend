import { BigNumber } from "ethers";

interface ElvateSubscription {
  amountIn: BigNumber;
  pairId: BigNumber;
  owner: string;
}

export default ElvateSubscription;
