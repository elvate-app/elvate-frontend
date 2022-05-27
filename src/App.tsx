import { Navigate, Route, Routes } from "react-router-dom";
import { Flex } from "src/components/Layout/Flex";
import Toolbar from "src/components/Toolbar";
import AppBar from "src/views/AppBar";
import AssetsView from "src/views/Assets";
import DashboardView from "src/views/Dashboard";
import NewPairView from "src/views/New";
import PairView from "src/views/Pair";
import PairsView from "src/views/Pairs";

const App = () => {
  return (
    <Flex>
      <AppBar>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/assets" element={<AssetsView />} />
          <Route path="/pairs" element={<PairsView />} />
          <Route path="/pairs/new" element={<NewPairView />} />
          <Route path="/pairs/:id" element={<PairView />} />
          <Route path="/stats" element={<Toolbar children="Statistics" />} />
        </Routes>
      </AppBar>
    </Flex>
  );
};

export default App;
