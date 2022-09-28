import { MaxUint256 } from "@ethersproject/constants";
import { ethers } from "ethers";
import { useElvateCoreContract, useTokenContract } from "src/hooks/useContract";
import useTokenAllowance from "src/hooks/useTokenAllowance";
import useCall from "src/hooks/useCall";
import GenericModal, { GenericModalProps } from "./GenericModal";

export type DepositTokenModalProps = {
  address: string;
} & GenericModalProps;

const DepositTokenModal = ({ address, ...props }: DepositTokenModalProps) => {
  const elvateContract = useElvateCoreContract(true);
  const tokenContract = useTokenContract(address, true);
  const { allowance } = useTokenAllowance(address);
  const approve = useCall(tokenContract.approve, "Approve");
  const depositToken = useCall(elvateContract.depositToken, "Deposit Token");

  const handleDeposit = async (amount: string, decimal: number) => {
    await depositToken(
      address,
      amount.length > 0 ? ethers.utils.parseUnits(amount, decimal) : "0"
    );
  };

  const handleApprove = async () => {
    await approve(elvateContract?.address, MaxUint256);
  };

  return (
    <GenericModal
      buttons={[
        {
          children: "Approve",
          onClick: handleApprove,
          closeOnFinish: false,
          disabled: allowance === true || allowance === null,
          sx: { marginRight: "0.5em;", flex: 1 },
        },
        {
          children: "Deposit",
          onClick: handleDeposit,
          disabled: !(allowance === true),
          sx: { flex: 1 },
        },
      ]}
      {...props}
    />
  );
};

export default DepositTokenModal;
