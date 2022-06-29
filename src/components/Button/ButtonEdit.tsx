import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useElvateCoreContract } from "src/hooks/useContract";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import LoadingButton from "./LoadingButton";

type ButtonEditProps = {
  pair: ElvatePair.PairStructOutput;
  amount: string;
  disabled?: boolean;
};

const ButtonEdit = ({ pair, amount, disabled = false }: ButtonEditProps) => {
  const contract = useElvateCoreContract();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <LoadingButton
      onClick={async () => {
        await getContrackCallWithSnackbar(
          contract,
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
