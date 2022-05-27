import { styled } from "@mui/material";
import { FlexCenterColumn } from "src/components/Layout/Flex";
import { Content } from "src/components/Toolbar";
import DashboardInformation from "./components/DashboardInformation";
import DashboardToolbar from "./components/DashboardToolbar";
import DashboardTop from "./components/DashboardTop";

const Root = styled(FlexCenterColumn)`
  width: 100%;
`;

const Dashboard = () => {
  return (
    <Root>
      <DashboardToolbar />
      <Content>
        <DashboardInformation />
        <DashboardTop />
      </Content>
    </Root>
  );
};

export default Dashboard;
