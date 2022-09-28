import { DialogProps } from "@mui/material";
import CustomTabs from "src/components/Tab";
import { ModalToolbar, ModalToolbarProps, StyledDialog } from "..";
import TransactionsInfo from "./TransactionsInfo";
import WalletInfo from "./WalletInfo";

type WalletModalProps = DialogProps & ModalToolbarProps;

const WalletModal = ({ title, onCancel, ...props }: WalletModalProps) => {
  return (
    <StyledDialog {...props}>
      <ModalToolbar title={title} onCancel={onCancel} />
      <CustomTabs
        labels={["Info", "Transactions"]}
        childrens={[<WalletInfo />, <TransactionsInfo />]}
      />
    </StyledDialog>
  );
};

export default WalletModal;
