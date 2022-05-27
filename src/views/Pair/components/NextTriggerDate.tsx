import { styled } from "@mui/material";
import { Flex, FlexCenter } from "src/components/Layout/Flex";
import Skeleton from "src/components/Skeleton";
import { H6 } from "src/components/Typo";
import useTimeLeft from "src/hooks/useTimeLeft";
import ElvatePair from "src/types/ElvatePair";
import { getTimeLeft } from "src/utils/time";

const Letter = styled(FlexCenter)`
  color: ${(props) => props.theme.palette.primary.contrastText};
  background-color: ${(props) => props.theme.palette.divider};
  margin: ${(props) => props.theme.spacing(0.5)};
  font-weight: bolder;
  border-radius: 5px;
  height: 1.8em;
  width: 1.8em;
`;

const Number = styled(H6)`
  font-weight: bolder;
`;

const Numbers = styled(H6)`
  font-variant-numeric: tabular-nums;
  text-align: center;
  font-weight: bolder;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 36.8px;
`;

const Spacing = styled("div")`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

type PairToolbarProps = {
  pair: ElvatePair;
};

const NextTriggerDate = ({ pair }: PairToolbarProps) => {
  const { time, percentage } = useTimeLeft(pair.lastPaidAt.toNumber());

  if (!percentage) return <StyledSkeleton />;

  return (
    <Flex>
      <FlexCenter>
        <Number>{getTimeLeft(time).days}</Number>
        <Letter>D</Letter>
        <Spacing />
        <Numbers>{getTimeLeft(time).hours}</Numbers>
        <Letter>h</Letter>
        <Numbers>{getTimeLeft(time).minutes}</Numbers>
        <Letter>m</Letter>
        <Numbers>{getTimeLeft(time).seconds}</Numbers>
        <Letter>s</Letter>
      </FlexCenter>
    </Flex>
  );
};

export default NextTriggerDate;
