import { styled } from "@mui/material";
import { FlexCenter } from "src/components/Layout/Flex";

const Root = styled(FlexCenter)`
  margin-top: auto;
  width: 100%;
`;

const Container = styled(FlexCenter)`
  background-color: ${({ theme }) =>
    theme.palette.mode === "light"
      ? theme.palette.background.background
      : theme.palette.background.darker};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  margin-top: ${({ theme }) => theme.spacing(5)};
  padding: ${({ theme }) => theme.spacing(5)};
  font-size: ${({ theme }) => theme.typography.subtitle2}
  width: 100%;
`;

const BottomBar = () => (
  <Root>
    <Container>elvate.io / beta</Container>
  </Root>
);

export default BottomBar;
