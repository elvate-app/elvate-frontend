import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FancyBox from "src/components/Box/FancyBox";
import { useIsSubscribed } from "src/hooks/useSubscriptions";
import ElvatePair from "src/types/ElvatePair";
import PairIcon from "./PairIcon";
import PairStats from "./PairStats";

const Root = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  padding: ${(props) => props.theme.spacing(1.5)};
  border-radius: 15px;
  cursor: pointer;
`;

type PairCardProps = {
  pair: ElvatePair;
};

const PairCard = ({ pair }: PairCardProps) => {
  const isSubscribed = useIsSubscribed(pair.id);
  const navigate = useNavigate();

  return (
    <FancyBox active={isSubscribed}>
      <Root onClick={() => navigate("/pairs/" + pair.id.toString())}>
        <PairIcon pair={pair} />
        <PairStats pair={pair} />
      </Root>
    </FancyBox>
  );
};

export default PairCard;
