import { AutoStories, GitHub } from "@mui/icons-material";
import { styled } from "@mui/material";
import { FlexCenter } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import SwitchThemeButton from "./SwitchThemeButton";

const Root = styled(FlexCenter)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Media = () => {
  return (
    <Root>
      <Spacing />
      <GitHub
        sx={{ cursor: "pointer" }}
        onClick={() => {
          window.open("https://github.com/elvate-app");
        }}
      />
      <Spacing />
      <AutoStories
        sx={{ cursor: "pointer" }}
        onClick={() => {
          window.open("https://docs.elvate.io");
        }}
      />
      <Spacing />
      <SwitchThemeButton />
      <Spacing />
    </Root>
  );
};

export default Media;
