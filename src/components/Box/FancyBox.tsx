import { Box, PaletteColor, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import { Flex } from "../Layout/Flex";

function animation(palette: PaletteColor) {
  return keyframes`
  0%{border-color: ${palette.light}};
  50%{border-color: ${palette.dark}};
  100%{border-color: ${palette.light}};
}`;
}

const Root = styled(Flex)`
  padding-left: ${(props) => props.theme.spacing(1)};
  padding-right: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(2)};
`;

const StyledRootBox = styled(Box)`
  border: 2px solid ${(props) => props.theme.palette.background.default};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  border-radius: 15px;
  width: 100%;

  &:hover {
    border: 2px solid ${(props) => props.theme.palette.secondary.dark};
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledRootBoxEnabled = styled(StyledRootBox)`
  animation: ${(props) => animation(props.theme.palette.primary)} linear 2s
    infinite;

  &:hover {
    animation: ${(props) => animation(props.theme.palette.secondary)} linear 2s
      infinite;
  }
`;

type FancyBoxProps = {
  children: JSX.Element | JSX.Element[];
  active?: boolean;
};

const FancyBox = ({ children, active = false }: FancyBoxProps) => {
  const RootBox = active ? StyledRootBoxEnabled : StyledRootBox;

  return (
    <Root>
      <RootBox>{children}</RootBox>
    </Root>
  );
};

export default FancyBox;
