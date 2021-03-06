import {
  alpha,
  Box,
  BoxProps,
  styled,
  Toolbar as TB,
  ToolbarProps,
} from "@mui/material";
import background from "src/assets/banner.png";

export const Toolbar = styled(
  ({ children, contentProps, ...props }: ToolbarContentProps) => (
    <TB {...props}>
      <Content {...contentProps}>{children}</Content>
    </TB>
  )
)`
  background-color: ${(props) => props.theme.palette.background.background};
  color: ${(props) => props.theme.palette.primary.contrastText};
  padding-bottom: ${(props) => props.theme.spacing(1)};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  padding: 0px !important;
  width: 100%;
  height: 6em;
`;

type ToolbarContentProps = ToolbarProps & { contentProps?: BoxProps };
export const ToolbarContent = styled(
  ({ children, contentProps, ...props }: ToolbarContentProps) => (
    <TB {...props}>
      <Content {...contentProps}>{children}</Content>
    </TB>
  )
)`
  padding: 0px !important;
  padding-top: ${(props) => props.theme.spacing(2)} !important;
  padding-bottom: ${(props) => props.theme.spacing(2)} !important;
  background-image: linear-gradient(
      to right,
      ${({ theme }) => alpha(theme.palette.background.dark, 0.85)},
      ${({ theme }) => alpha(theme.palette.background.dark, 0.9)},
      ${({ theme }) => alpha(theme.palette.background.dark, 0.9)}
    ),
    url(${background});
  margin-bottom: ${(props) => props.theme.spacing(2)};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  background-position: 0% 80%;
  background-size: cover;
  width: 100%;
`;

export const Content = styled((props: BoxProps) => <Box {...props} />)`
  padding: ${(props) => props.theme.spacing(1.5)};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

type ContentHeaderProps = BoxProps & { contentProps?: BoxProps };
export const ContentHeader = styled(
  ({ children, contentProps, ...props }: ContentHeaderProps) => (
    <Box {...props}>
      <Content {...contentProps}>{children}</Content>
    </Box>
  )
)`
  background-color: ${(props) => props.theme.palette.background.default};
  padding-left: ${(props) => props.theme.spacing(2)};
  width: 100%;
`;

export default Toolbar;
