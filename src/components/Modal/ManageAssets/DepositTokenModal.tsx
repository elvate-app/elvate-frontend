import { MaxUint256 } from "@ethersproject/constants";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useElvateCoreContract, useTokenContract } from "src/hooks/useContract";
import useTokenAllowance from "src/hooks/useTokenAllowance";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import GenericModal, { GenericModalProps } from "./GenericModal";

export type DepositTokenModalProps = {
  address: string;
} & GenericModalProps;

const DepositTokenModal = ({ address, ...props }: DepositTokenModalProps) => {
  const elvateContract = useElvateCoreContract(true);
  const tokenContract = useTokenContract(address, true);
  const { enqueueSnackbar } = useSnackbar();
  const { allowance } = useTokenAllowance(address);

  const handleDeposit = async (amount: string, decimal: number) => {
    console.log(elvateContract);
    await getContrackCallWithSnackbar(
      elvateContract,
      "depositToken",
      enqueueSnackbar,
      [
        address,
        amount.length > 0 ? ethers.utils.parseUnits(amount, decimal) : "0",
      ]
    );
  };

  const handleApprove = async () => {
    await getContrackCallWithSnackbar(
      tokenContract,
      "approve",
      enqueueSnackbar,
      [elvateContract?.address, MaxUint256]
    );
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
