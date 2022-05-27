import { styled } from "@mui/material";
import { BigNumber } from "ethers";
import { useParams } from "react-router-dom";
import { FlexCenterColumn } from "src/components/Layout/Flex";
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

      {/* <InfoCard>
        Subscribe here. If your deposit allow it, the purchase will be performed
        when the pair will be triggered. Anyone can trigger a pair and can
        obtain a small amount of fees.
      </InfoCard> */}

      <PairSubscription pair={pair} />
    </Root>
  );
};

export default Pair;
