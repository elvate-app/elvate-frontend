import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card, { CardProps } from "src/components/Card";
import { Spacing } from "src/components/Layout/Spacing";
import { Subtitle2, Subtitle3 } from "src/components/Typo";
import { ElvatePair } from "src/types/v1/ElvateCore";
import PairIcon from "src/views/Pairs/components/PairIcon";

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing(1.5)};
  transition: background-color 0.3s;
  align-items: center;
  border-radius: 0px;
  margin-bottom: 2px;
  cursor: pointer;
  display: flex;
`;

const CustomKeyboardArrowRight = styled(KeyboardArrowRight)`
  transition: all 0.3s;
  align-self: center;
  width: 1em;
  height: 1em;
  margin-left: ${(props) => props.theme.spacing(1)};
`;

type DashboardPairCardProps = {
  pair: ElvatePair.PairStructOutput;
  info: string;
  value: string | number | JSX.Element;
} & Omit<CardProps, "onClick" | "hover">;

const DashboardPairCard = ({
  pair,
  info,
  value,
  ...props
}: DashboardPairCardProps) => {
  const navigate = useNavigate();

  return (
    <StyledCard
      onClick={() =>
        pair ? navigate("/pairs/" + pair.id.toString()) : undefined
      }
      hover
      {...props}
    >
      <PairIcon pair={pair} />
      <Spacing />
      <Box marginRight={1}>
        <Subtitle3>{info}</Subtitle3>
        <Subtitle2>{value}</Subtitle2>
      </Box>
      <CustomKeyboardArrowRight />
    </StyledCard>
  );
};

export default DashboardPairCard;
