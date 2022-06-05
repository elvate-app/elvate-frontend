import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useElvateSubscriptionContract } from "src/hooks/useContract";
import ElvatePair from "src/types/ElvatePair";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import LoadingButton from "./LoadingButton";

type ButtonEditProps = {
  pair: ElvatePair;
  amount: string;
  disabled?: boolean;
};

const ButtonEdit = ({ pair, amount, disabled = false }: ButtonEditProps) => {
  const subscriptionContract = useElvateSubscriptionContract(true);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <LoadingButton
      onClick={async () => {
        await getContrackCallWithSnackbar(
          subscriptionContract,
          "subscribe",
          enqueueSnackbar,
          [pair.tokenIn, pair.tokenOut, ethers.utils.parseEther(amount)]
        );
      }}
      disabled={disabled}
    >
      Edit
    </LoadingButton>
  );
};

export default ButtonEdit;
