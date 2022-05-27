import {
  Dashboard,
  Layers,
  OpenInNew,
  QueryStats,
  Token,
} from "@mui/icons-material";
import { Box, BoxProps, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, FlexCenterColumn } from "src/components/Layout/Flex";
import { H6 } from "src/components/Typo";

const StyledOpenInNew = styled(OpenInNew)`
  width: 0.8em;
  cursor: pointer;
  margin-left: ${(props) => props.theme.spacing(2)};
`;

interface SidebarSectionProps {
  active: boolean;
}

export const Button = styled((props: SidebarSectionProps & BoxProps) => (
  <Box {...props} />
))`
  color: ${(props) =>
    props.active
      ? props.theme.palette.mode === "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.main
      : props.theme.palette.text.primary};
  padding: ${(props) => props.theme.spacing(1)};
  margin: ${(props) => props.theme.spacing(0.5)};
  align-items: center;
  cursor: pointer;
  width: 80%;
`;

const ButtonIcon = styled("div")`
  display: flex;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

type NavigationButtonProps = {
  text: string;
  icon: JSX.Element;
  to?: string;
  iconRight?: JSX.Element;
  onClick?: () => void;
};
const NavigationButton = ({
  to,
  text,
  icon,
  iconRight,
  onClick,
}: NavigationButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active: boolean = to !== undefined && location.pathname.includes(to);

  return (
    <Button
      onClick={() => {
        if (to) navigate(to);
        if (onClick) onClick();
      }}
      active={active}
    >
      <Flex alignItems="center">
        <ButtonIcon>{icon}</ButtonIcon>
        <H6>{text}</H6>
        {iconRight ? iconRight : <></>}
      </Flex>
    </Button>
  );
};

type NavigationProps = {
  onClick?: () => void;
};

const Navigation = ({ onClick }: NavigationProps) => {
  return (
    <FlexCenterColumn>
      <NavigationButton
        to={"/dashboard"}
        text={"Dashboard"}
        icon={<Dashboard />}
        onClick={onClick}
      />
      <NavigationButton
        to={"/assets"}
        text={"Assets"}
        icon={<Token />}
        onClick={onClick}
      />
      <NavigationButton
        to={"/pairs"}
        text={"Pairs"}
        icon={<Layers />}
        onClick={onClick}
      />
      <NavigationButton
        text={"Stats"}
        iconRight={<StyledOpenInNew />}
        icon={<QueryStats />}
        onClick={() => {
          window.open("https://stats.elvate.io");
          if (onClick) onClick();
        }}
      />
    </FlexCenterColumn>
  );
};

export default Navigation;
