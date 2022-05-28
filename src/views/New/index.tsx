import { KeyboardArrowLeft } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenterColumn } from "src/components/Layout/Flex";
import Toolbar from "src/components/Toolbar";
import { H5 } from "src/components/Typo";
import CreatePair from "./components/CreatePair";

const Root = styled(FlexCenterColumn)`
  width: 100%;
`;

const CustomArrowBack = styled(KeyboardArrowLeft)`
  font-size: ${(props) => props.theme.typography.h4};
  margin-right: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
`;

const Assets = () => {
  const navigate = useNavigate();
  return (
    <Root>
      <Toolbar contentProps={{ display: "flex", alignItems: "center" }}>
        <CustomArrowBack onClick={() => navigate(-1)} />
        <H5>Create New Pair</H5>
      </Toolbar>
      <CreatePair />
    </Root>
  );
};

export default Assets;
