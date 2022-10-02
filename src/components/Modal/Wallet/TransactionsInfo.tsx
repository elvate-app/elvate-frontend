import {
  AddCircleOutline,
  CheckCircleOutline,
  RotateRight,
} from "@mui/icons-material";
import { keyframes, Pagination, styled } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Flex, FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { CopyTooltip, OpenInNewTooltip } from "src/components/Tooltip";
import { Subtitle1, Subtitle2, Subtitle3 } from "src/components/Typo";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import { useExplorer } from "src/hooks/useExplorer";
import { useTransactions } from "src/hooks/useTransactions";
import { clearAllTransactions } from "src/state/transactions/actions";

const TRANSACTION_PER_PAGE = 5;

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

const Container = styled(FlexCenter)`
  background-color: ${(props) => props.theme.palette.background.dark};
  margin-top: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)};
  padding-bottom: 0px;
  flex-direction: column;
  justify-content: center;
  alignitems: center;
  border-radius: 5px;
`;

const TransactionsInfo = () => {
  const [page, setPage] = useState<number>(1);
  const allTransactions = useTransactions();
  const explorer = useExplorer();
  const dispatch = useDispatch();

  const transactions: Array<any> = useMemo(
    () =>
      Object.entries(
        allTransactions && allTransactions[NETWORK_MATIC_MUMBAI_TESTNET]
          ? allTransactions[NETWORK_MATIC_MUMBAI_TESTNET]
          : {}
      ) || [],
    [allTransactions]
  );

  const pages = useMemo(
    () => Math.ceil(transactions.length / TRANSACTION_PER_PAGE),
    [transactions]
  );

  const handlePageChange = (index: number) => {
    setPage(index);
  };

  const handleClearTransactions = () => {
    dispatch(clearAllTransactions());
  };

  const transactionsToDisplay = useMemo(
    () =>
      [...transactions]
        .reverse()
        .splice(TRANSACTION_PER_PAGE * (page - 1), TRANSACTION_PER_PAGE),
    [transactions, page]
  );

  return (
    <Root>
      <FlexCenter>
        <Subtitle2 sx={{ flex: 1 }}>Transactions:</Subtitle2>
        {transactions.length > 0 ? (
          <StyledClearButton onClick={handleClearTransactions}>
            CLEAR
          </StyledClearButton>
        ) : (
          <></>
        )}
      </FlexCenter>
      <Container>
        {transactions.length > 0 ? (
          transactionsToDisplay.map((transaction, index) => (
            <Flex
              key={index}
              justifyContent="center"
              alignItems="center"
              marginBottom={2}
              width="100%"
            >
              {!transaction[1].blockHash ? (
                <StyledRotateRight />
              ) : transaction[1].status === 1 ? (
                <StyledCheckCircleOutline />
              ) : (
                <StyledAddCircleOutline />
              )}
              <Subtitle1 flex={1}>{transaction[1].label}</Subtitle1>
              <CopyTooltip
                value={transaction[1].transactionHash}
                iconProps={{ sx: { marginLeft: 1 } }}
              />
              <OpenInNewTooltip
                value={explorer + "tx/" + transaction[1].transactionHash}
                iconProps={{ sx: { marginLeft: 1 } }}
              />
            </Flex>
          ))
        ) : (
          <Subtitle2>No Transactions found</Subtitle2>
        )}
      </Container>

      <FlexCenter flex={1} marginTop={2}>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, index) => handlePageChange(index)}
        />
      </FlexCenter>
    </Root>
  );
};

export default TransactionsInfo;
