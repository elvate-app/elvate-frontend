import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useElvateCoreContract } from "src/hooks/useContract";
import GenericModal, { GenericModalProps } from "./GenericModal";

import useCall from "src/hooks/useCall";

export type DepositModalProps = GenericModalProps;

const DepositModal = ({ ...props }: DepositModalProps) => {
  const { account } = useWeb3React();
  const elvateContract = useElvateCoreContract(true);
  const deposit = useCall(elvateContract.deposit);

  const handleDeposit = async (amount: string, decimal: number) => {
    await deposit({
      value: ethers.utils.parseUnits(amount.length > 0 ? amount : "0", decimal),
    });
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
