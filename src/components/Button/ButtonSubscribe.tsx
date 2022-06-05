import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useElvateSubscriptionContract } from "src/hooks/useContract";
import ElvatePair from "src/types/ElvatePair";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import LoadingButton from "./LoadingButton";

type ButtonSubscribeProps = {
  pair: ElvatePair;
  amount: string;
  disabled?: boolean;
};

const ButtonSubscribe = ({
  pair,
  amount,
  disabled = false,
}: ButtonSubscribeProps) => {
  const { account } = useWeb3React();
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
      disabled={disabled || !account}
    >
      Subscribe
    </LoadingButton>
  );
};

export default ButtonSubscribe;
