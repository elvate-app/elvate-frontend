import { styled } from "@mui/material";
import { BigNumber } from "ethers";
import { useParams } from "react-router-dom";
import { InfoCard } from "src/components/Card";
import { FlexCenterColumn } from "src/components/Layout/Flex";
import { Content } from "src/components/Toolbar";
import { usePairWithId } from "src/hooks/usePairs";
import PairSubscription from "./components/PairSubscription";
import PairToolbar from "./components/PairToolbar";

const Root = styled(FlexCenterColumn)`
  width: 100%;
  height: 100%;
`;

const Pair = () => {
  const { id } = useParams();
  const pair = usePairWithId(BigNumber.from(id));

  if (!pair) return <></>;

  return (
    <Root>
      <PairToolbar pair={pair} />

      <Content width={{ xs: "331px", md: "700px" }}>
        <InfoCard margin="auto">
          Subscribe here to automatically buy each week.
        </InfoCard>

        <PairSubscription pair={pair} />
      </Content>
    </Root>
  );
};

export default Pair;
