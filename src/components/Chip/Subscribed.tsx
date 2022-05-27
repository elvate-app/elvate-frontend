import { BigNumber } from "@ethersproject/bignumber";
import DoneIcon from "@mui/icons-material/Done";
import { alpha, Chip, ChipProps, styled } from "@mui/material";
import { useIsSubscribed } from "src/hooks/useSubscriptions";

const StyledChip = styled(Chip)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.1)};
  border-radius: 5px;
`;

const StyledDoneIcon = styled(DoneIcon)`
  font-size: 16px;
`;

type SubscribedChipProps = {
  pairId: BigNumber;
} & ChipProps;

const SubscribedChip = ({ pairId, ...props }: SubscribedChipProps) => {
  const isSubscribed = useIsSubscribed(pairId);

  if (!isSubscribed) return <></>;
  return <StyledChip label="Sub" icon={<StyledDoneIcon />} {...props} />;
};

export default SubscribedChip;
