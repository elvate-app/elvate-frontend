import { ethers } from "ethers";
import { useElvateCoreContract } from "src/hooks/useContract";
import { ElvatePair } from "src/types/v1/ElvateCore";
import useCall from "src/hooks/useCall";
import LoadingButton from "./LoadingButton";

type ButtonEditProps = {
  pair: ElvatePair.PairStructOutput;
  amount: string;
  disabled?: boolean;
};

const ButtonEdit = ({ pair, amount, disabled = false }: ButtonEditProps) => {
  const contract = useElvateCoreContract();
  const subscribe = useCall(contract.subscribe);

  return (
    <LoadingButton
      onClick={async () => {
        await subscribe(
          pair.tokenIn,
          pair.tokenOut,
          ethers.utils.parseEther(amount)
        );
      }}
      disabled={disabled}
    >
      Edit
    </LoadingButton>
  );
};

export default ButtonEdit;
