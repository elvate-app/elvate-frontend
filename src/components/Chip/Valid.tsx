import DoneIcon from "@mui/icons-material/Done";
import { alpha, Chip, ChipProps, styled } from "@mui/material";
import { useDeposit } from "src/hooks/usePortfolio";
import { useSubscriptionsFromAccount } from "src/hooks/useSubscriptions";
import ElvatePair from "src/types/ElvatePair";
import ElvateSubscription from "src/types/ElvateSubscription";

const StyledChip = styled(Chip)`
  border: 1px solid ${({ theme }) => theme.palette.success.main};
  background-color: ${({ theme }) => alpha(theme.palette.success.main, 0.1)};
  border-radius: 5px;
`;

const StyledDoneIcon = styled(DoneIcon)`
  font-size: 16px;
`;

type ValidChipProps = {
  pair: ElvatePair;
} & ChipProps;

const ValidChip = ({ pair, ...props }: ValidChipProps) => {
  const deposit = useDeposit(pair.tokenIn);
  const subscriptions = useSubscriptionsFromAccount();
  const subscription: ElvateSubscription | undefined = subscriptions?.filter(
    (sub: ElvateSubscription) => sub.pairId.eq(pair.id)
  )[0];

  const isValid = subscription && deposit && deposit.gte(subscription.amountIn);

  if (!isValid) return <></>;
  return <StyledChip label="Valid" icon={<StyledDoneIcon />} {...props} />;
};

export default ValidChip;
