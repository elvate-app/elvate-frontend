import { styled } from "@mui/material";
import { InfoCard } from "src/components/Card";
import { FlexCenterColumn } from "src/components/Layout/Flex";
import { Content } from "src/components/Toolbar";
import { PairsContent } from "./components/PairsContent";
import PairsToolbar from "./components/PairsToolbar";

const Root = styled(FlexCenterColumn)`
  width: 100%;
  height: 100%;
`;

const Pairs = () => {
  return (
    <Root>
      <PairsToolbar />

      <Content>
        <InfoCard>
          Consult all the available pairs. You can create new pair if you can't
          find your choice.
        </InfoCard>

        <PairsContent />
      </Content>
    </Root>
  );
};

export default Pairs;
