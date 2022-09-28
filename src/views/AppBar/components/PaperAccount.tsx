import { AccountBalanceWallet, RotateRight } from "@mui/icons-material";
import { keyframes, Paper, styled } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useModal } from "mui-modal-provider";
import { useMemo } from "react";
import WalletModal from "src/components/Modal/Wallet";
import { Subtitle2 } from "src/components/Typo";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import { useTransactions } from "src/hooks/useTransactions";

function animation() {
  return keyframes`
  0%{transform: rotate(0deg)};
  50%{transform: rotate(180deg)};
  100%{transform: rotate(360deg)};
}`;
}

const StyledRotateRight = styled(RotateRight)`
  animation: ${() => animation()} linear 2s infinite;
`;

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.palette.divider};
  color: ${(props) => props.theme.palette.text.primary};
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
`;

const StyledBox = styled(Subtitle2)`
  flex: 1;
  text-align: center;
`;

const PaperAccount = () => {
  const { account } = useWeb3React();
  const { showModal } = useModal();
  const smallAddress =
    account?.substring(0, 7) +
    "..." +
    account?.substring(account.length - 7, account.length);

  const transactions = useTransactions();

  const pendingTransactions = useMemo(
    () =>
      Object.keys(transactions).length > 0
        ? Object.keys(transactions[NETWORK_MATIC_MUMBAI_TESTNET]).filter(
            (hash: string) =>
              !transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash]?.blockHash
          )
        : [],
    [transactions]
  );

  return (
    <StyledPaper
      onClick={() => {
        const modal = showModal(WalletModal, {
          title: `Your Wallet`,
          onCancel: () => {
            modal.hide();
          },
        });
      }}
    >
      {pendingTransactions.length > 0 ? (
        <StyledRotateRight />
      ) : (
        <AccountBalanceWallet />
      )}
      <StyledBox>{smallAddress}</StyledBox>
    </StyledPaper>
  );
};

export default PaperAccount;
