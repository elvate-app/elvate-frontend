import { Box, LinearProgress, styled } from "@mui/material";
import useTimeLeft from "src/hooks/useTimeLeft";
import ElvatePair from "src/types/ElvatePair";

const Root = styled(Box)`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1)};

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

const CustomLinearProgress = styled(LinearProgress)`
  & .MuiLinearProgress-bar {
    transition: all 0.2s;
  }
`;

type PairTriggerProgressProps = {
  pair: ElvatePair;
};

const PairTriggerProgress = ({ pair }: PairTriggerProgressProps) => {
  const { percentage } = useTimeLeft(pair.lastPaidAt.toNumber());

  return (
    <Root>
      <CustomLinearProgress variant="determinate" value={percentage} />
    </Root>
  );
};

export default PairTriggerProgress;
