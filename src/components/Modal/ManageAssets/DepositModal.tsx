import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import { useElvateCoreContract } from "src/hooks/useContract";
import { getContrackCallWithSnackbar } from "src/utils/getContractCall";
import GenericModal, { GenericModalProps } from "./GenericModal";

export type DepositModalProps = GenericModalProps;

const DepositModal = ({ ...props }: DepositModalProps) => {
  const { account } = useWeb3React();
  const elvateContract = useElvateCoreContract(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeposit = async (amount: string, decimal: number) => {
    await getContrackCallWithSnackbar(
      elvateContract,
      "deposit",
      enqueueSnackbar,
      [
        {
          value: ethers.utils.parseUnits(
            amount.length > 0 ? amount : "0",
            decimal
          ),
        },
      ]
    );
  };

  return (
    <GenericModal
      buttons={[
        {
          children: "Deposit",
          onClick: handleDeposit,
          disabled: !account,
          sx: { flex: 1 },
        },
      ]}
      {...props}
    />
  );
};

export default DepositModal;
