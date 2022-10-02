import {
  AddCircleOutline,
  CheckCircleOutline,
  RotateRight,
} from "@mui/icons-material";
import { keyframes, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { Flex, FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { CopyTooltip, OpenInNewTooltip } from "src/components/Tooltip";
import { Subtitle1, Subtitle2, Subtitle3 } from "src/components/Typo";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import { useExplorer } from "src/hooks/useExplorer";
import { useTransactions } from "src/hooks/useTransactions";
import { clearAllTransactions } from "src/state/transactions/actions";

function animation() {
  return keyframes`
  0%{transform: rotate(0deg)};
  50%{transform: rotate(180deg)};
  100%{transform: rotate(360deg)};
}`;
}

const StyledRotateRight = styled(RotateRight)`
  animation: ${() => animation()} linear 2s infinite;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const StyledCheckCircleOutline = styled(CheckCircleOutline)`
  color: ${(props) => props.theme.palette.primary.main};
  margin-right: ${(props) => props.theme.spacing(2)};
`;
const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: ${(props) => props.theme.palette.error.main};
  margin-right: ${(props) => props.theme.spacing(2)};
  transform: rotate(45deg);
`;

const StyledClearButton = styled(Subtitle3)`
  color: ${(props) => props.theme.palette.primary.main};
  cursor: pointer;
`;

const Root = styled(FlexColumn)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.background.darker};
`;

const TransactionsInfo = () => {
  const transactions = useTransactions();
  const explorer = useExplorer();
  const dispatch = useDispatch();

  const handleClearTransactions = () => {
    dispatch(clearAllTransactions());
  };

  return (
    <Root>
      <FlexCenter>
        <Subtitle2 sx={{ flex: 1 }}>Transactions:</Subtitle2>
        {Object.keys(transactions?.[NETWORK_MATIC_MUMBAI_TESTNET]).length >
        0 ? (
          <StyledClearButton onClick={handleClearTransactions}>
            CLEAR
          </StyledClearButton>
        ) : (
          <></>
        )}
      </FlexCenter>
      {Object.keys(transactions?.[NETWORK_MATIC_MUMBAI_TESTNET]).length > 0 ? (
        Object.keys(transactions[NETWORK_MATIC_MUMBAI_TESTNET]).map(
          (hash, index) => (
            <Flex
              key={index}
              justifyContent="center"
              alignItems="center"
              marginTop={2}
            >
              {!transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash].blockHash ? (
                <StyledRotateRight />
              ) : transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash].status ===
                1 ? (
                <StyledCheckCircleOutline />
              ) : (
                <StyledAddCircleOutline />
              )}
              <Subtitle1 flex={1}>
                {transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash].label}
              </Subtitle1>
              <CopyTooltip
                value={
                  transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash]
                    .transactionHash
                }
                iconProps={{ sx: { marginLeft: 1 } }}
              />
              <OpenInNewTooltip
                value={
                  explorer +
                  "tx/" +
                  transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash]
                    .transactionHash
                }
                iconProps={{ sx: { marginLeft: 1 } }}
              />
            </Flex>
          )
        )
      ) : (
        <Subtitle2 sx={{ marginTop: 2 }}>No Transactions found</Subtitle2>
      )}
    </Root>
  );
};

export default TransactionsInfo;
