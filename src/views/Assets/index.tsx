import { styled } from "@mui/material";
import { InfoCard } from "src/components/Card";
import { FlexCenterColumn } from "src/components/Layout/Flex";
import { Content } from "src/components/Toolbar";
import AssetsList from "./components/AssetsList";
import AssetsToolbar from "./components/AssetsToolbar";

const Root = styled(FlexCenterColumn)`
  width: 100%;
`;

const Assets = () => {
  return (
    <Root>
      <AssetsToolbar />

      <Content>
        <InfoCard>You can deposit and withdraw at anytime.</InfoCard>

        <AssetsList />
      </Content>
    </Root>
  );
};

export default Assets;
