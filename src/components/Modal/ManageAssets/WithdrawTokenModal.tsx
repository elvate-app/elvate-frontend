import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useElvateCoreContract } from "src/hooks/useContract";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import GenericModal, { GenericModalProps } from "./GenericModal";

export type WithdrawTokenModalProps = {
  address: string;
} & GenericModalProps;

const WithdrawTokenModal = ({ address, ...props }: WithdrawTokenModalProps) => {
  const contract = useElvateCoreContract(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleWithdraw = async (amount: string, decimal: number) => {
    await getContrackCallWithSnackbar(
      contract,
      "withdrawToken",
      enqueueSnackbar,
      [
        address,
        ethers.utils.parseUnits(amount.length > 0 ? amount : "0", decimal),
      ]
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
