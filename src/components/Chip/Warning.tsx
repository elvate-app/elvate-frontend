import { WarningRounded } from "@mui/icons-material";
import { styled, SvgIconProps } from "@mui/material";
import { useDeposit } from "src/hooks/usePortfolio";
import { useSubscriptionsFromAccount } from "src/hooks/useSubscriptions";
import ElvatePair from "src/types/ElvatePair";
import ElvateSubscription from "src/types/ElvateSubscription";
import { InfoTooltip } from "../Tooltip";

const StyledWarning = styled(WarningRounded)`
  color: ${({ theme }) => theme.palette.warning.main};
`;

type WarningChipProps = {
  pair: ElvatePair;
} & SvgIconProps;

const WarningChip = ({ pair, ...props }: WarningChipProps) => {
  const deposit = useDeposit(pair.tokenIn);
  const subscriptions = useSubscriptionsFromAccount();
  const subscription: ElvateSubscription | undefined = subscriptions?.filter(
    (sub: ElvateSubscription) => sub.pairId.eq(pair.id)
  )[0];

  if (!deposit || !subscription) return <></>;

  // subscribed with no deposit
  if (!deposit.gte(subscription.amountIn))
    return (
      <InfoTooltip
        title="Not enought deposit to be eligible"
        icon={<StyledWarning {...props} />}
      />
    );

  return <></>;
};

export default WarningChip;
