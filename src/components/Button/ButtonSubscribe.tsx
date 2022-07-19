import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useElvateCoreContract } from "src/hooks/useContract";
import { ElvatePair } from "src/types/v1/ElvateCore";
import useCall from "src/hooks/useCall";
import LoadingButton from "./LoadingButton";

type ButtonSubscribeProps = {
  pair: ElvatePair.PairStructOutput;
  amount: string;
  disabled?: boolean;
};

const ButtonSubscribe = ({
  pair,
  amount,
  disabled = false,
}: ButtonSubscribeProps) => {
  const { account } = useWeb3React();
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
      disabled={disabled || !account}
    >
      Subscribe
    </LoadingButton>
  );
};

export default ButtonSubscribe;
