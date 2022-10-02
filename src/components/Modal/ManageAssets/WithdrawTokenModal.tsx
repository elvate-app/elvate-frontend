import { ethers } from "ethers";
import { useElvateCoreContract } from "src/hooks/useContract";
import useCall from "src/hooks/useCall";
import GenericModal, { GenericModalProps } from "./GenericModal";

export type WithdrawTokenModalProps = {
  address: string;
} & GenericModalProps;

const WithdrawTokenModal = ({ address, ...props }: WithdrawTokenModalProps) => {
  const contract = useElvateCoreContract(true);
  const withdrawToken = useCall(contract.withdrawToken, "Withdraw Token");

  const handleWithdraw = async (amount: string, decimal: number) => {
    await withdrawToken(
      address,
      ethers.utils.parseUnits(amount.length > 0 ? amount : "0", decimal)
    );
  };

  return (
    <GenericModal
      buttons={[
        { children: "Withdraw", onClick: handleWithdraw, fullWidth: true },
      ]}
      {...props}
    />
  );
};

export default WithdrawTokenModal;
