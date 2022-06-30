import { WarningRounded } from "@mui/icons-material";
import { styled, SvgIconProps } from "@mui/material";
import { useDeposit } from "src/hooks/usePortfolio";
import { useSubscriptionsFromAccount } from "src/hooks/useSubscriptions";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { InfoTooltip } from "../Tooltip";

const StyledWarning = styled(WarningRounded)`
  color: ${({ theme }) => theme.palette.warning.main};
`;

type WarningChipProps = {
  pair: ElvatePair.PairStructOutput;
} & SvgIconProps;

const WarningChip = ({ pair, ...props }: WarningChipProps) => {
  const deposit = useDeposit(pair.tokenIn);
  const subs = useSubscriptionsFromAccount();
  const sub = subs?.get(pair.id.toString())?.[0];

  if (!deposit || !sub) return <></>;

  // subscribed with no deposit
  if (!deposit.gte(sub.amountIn))
    return (
      <InfoTooltip
        title="Not enought deposit to be eligible"
        icon={<StyledWarning {...props} />}
      />
    );

  return <></>;
};

export default WarningChip;
