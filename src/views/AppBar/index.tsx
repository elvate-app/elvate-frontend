import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Drawer, IconButton, styled } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import ElvateLogoDark from "src/assets/elvate-logo-dark.svg";
import ElvateLogoLight from "src/assets/elvate-logo-light.svg";
import ElvateTextDark from "src/assets/elvate-text-dark.svg";
import ElvateTextLight from "src/assets/elvate-text-white.svg";
import { Flex, FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import BottomBar from "../BottomBar";
import Connect from "./components/Connect";
import Media from "./components/Media";
import Navigation from "./components/Navigation";

export const drawerWidth = 220;

const DrawerRootContent = styled(FlexColumn)`
  background-color: ${(props) => props.theme.palette.background.default};
  height: 100vh;
`;

const RootContent = styled(FlexColumn)`
  width: 100%;
  min-height: 100vh;
`;

const ElvateText = styled("img")`
  margin-top: ${(props) => props.theme.spacing(2)};
  margin-left: ${(props) => props.theme.spacing(1)};
`;

const ElvateLogo = styled("img")`
  margin-top: ${(props) => props.theme.spacing(2)};
  margin-right: ${(props) => props.theme.spacing(1)};
`;

const FixedBar = styled(Flex)`
  background-color: ${(props) => props.theme.palette.background.dark};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
`;

type DrawerContentProps = {
  onClick?: () => void;
};

const DrawerContent = ({ ...props }: DrawerContentProps) => {
  const theme = useTheme();

  return (
    <DrawerRootContent>
      <FlexCenter padding={2}>
        <ElvateLogo
          src={
            theme.palette.mode === "light" ? ElvateLogoDark : ElvateLogoLight
          }
          width={drawerWidth / 5}
        />
        <ElvateText
          src={
            theme.palette.mode === "light" ? ElvateTextDark : ElvateTextLight
          }
          width={drawerWidth / 1.9}
        />
      </FlexCenter>
      <Spacing />
      <Navigation {...props} />
      <Spacing flex={4} />
      <Connect />
      <Media />
    </DrawerRootContent>
  );
};

type CustomAppBarProps = {
  children: JSX.Element | JSX.Element[];
};

const CustomAppBar = ({ children }: CustomAppBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Flex fullWidth>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      />
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerContent onClick={handleDrawerToggle} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "0px",
            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)",
          },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
      <RootContent>
        <FixedBar>
          <Spacing />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ width: "1.5em", height: "1.5em" }} />
          </IconButton>
        </FixedBar>
        <Flex marginTop={{ xs: 6, sm: 0 }}>{children}</Flex>
        <BottomBar />
      </RootContent>
    </Flex>
  );
};

export default CustomAppBar;
