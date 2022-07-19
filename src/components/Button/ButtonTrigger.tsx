import { useWeb3React } from "@web3-react/core";
import { useElvateCoreContract } from "src/hooks/useContract";
import useTimeLeft from "src/hooks/useTimeLeft";
import { ElvatePair } from "src/types/v1/ElvateCore";
import useCall from "src/hooks/useCall";
import LoadingButton from "./LoadingButton";

type ButtonSubscribeProps = {
  pair: ElvatePair.PairStructOutput;
};

const ButtonTrigger = ({ pair }: ButtonSubscribeProps) => {
  const { account } = useWeb3React();
  const contract = useElvateCoreContract();
  const { time } = useTimeLeft(pair.lastPaidAt.toNumber());
  const disabled: boolean = time > 0;
  const triggerPair = useCall(contract.triggerPair);

  return (
    <LoadingButton
      onClick={async () => {
        await triggerPair(pair.tokenIn, pair.tokenOut);
      }}
      disabled={disabled || !account}
    >
      Trigger
    </LoadingButton>
  );
};

export default ButtonTrigger;
