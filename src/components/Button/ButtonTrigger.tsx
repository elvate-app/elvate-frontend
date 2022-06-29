import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { useElvateCoreContract } from "src/hooks/useContract";
import useTimeLeft from "src/hooks/useTimeLeft";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import LoadingButton from "./LoadingButton";

type ButtonSubscribeProps = {
  pair: ElvatePair.PairStructOutput;
};

const ButtonTrigger = ({ pair }: ButtonSubscribeProps) => {
  const { account } = useWeb3React();
  const contract = useElvateCoreContract();
  const { enqueueSnackbar } = useSnackbar();
  const { time } = useTimeLeft(pair.lastPaidAt.toNumber());
  const disabled: boolean = time > 0;

  return (
    <LoadingButton
      onClick={async () => {
        await getContrackCallWithSnackbar(
          contract,
          "triggerPair",
          enqueueSnackbar,
          [pair.tokenIn, pair.tokenOut]
        );
      }}
      disabled={disabled || !account}
    >
      Trigger
    </LoadingButton>
  );
};

export default ButtonTrigger;
