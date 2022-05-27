import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card, { CardProps } from "src/components/Card";
import { Flex } from "src/components/Layout/Flex";
import { Subtitle2, Subtitle3 } from "src/components/Typo";
import ElvatePair from "src/types/ElvatePair";
import PairIcon from "./PairIcon";
import {
  PairSubscriptionAmount,
  PairSubscriptions,
  PairTriggerTimeLeft,
} from "./PairStats";

const CustomKeyboardArrowRight = styled(KeyboardArrowRight)`
  transition: all 0.3s;
  align-self: center;
  width: 1em;
  height: 1em;
`;

type PairLineProps = {
  pair: ElvatePair;
} & CardProps;

const PairLine = ({ pair, ...props }: PairLineProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/pairs/" + pair.id.toString())}
      display={"flex"}
      padding={1}
      marginBottom={"2px"}
      hover
      {...props}
    >
      <Flex flex={1}>
        <PairIcon pair={pair} />
      </Flex>
      <Flex flex={1} alignItems="center">
        <Box flex={2} display={{ xs: "none", md: "block" }}>
          <Subtitle3>Subscribers</Subtitle3>
          <Subtitle2>{<PairSubscriptions pair={pair} />}</Subtitle2>
        </Box>
        <Box flex={2} display={{ xs: "none", md: "block" }}>
          <Subtitle3>Next Trigger</Subtitle3>
          <Subtitle2>{<PairTriggerTimeLeft pair={pair} />}</Subtitle2>
        </Box>
        <Box flex={2}>
          <Subtitle3>Subscription</Subtitle3>
          <Subtitle2>
            <PairSubscriptionAmount pair={pair} />
          </Subtitle2>
        </Box>
      </Flex>
      <CustomKeyboardArrowRight />
    </Card>
  );
};

export default PairLine;
