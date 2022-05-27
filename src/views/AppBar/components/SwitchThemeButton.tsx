import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { IconButton, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { useThemeType } from "src/hooks/useSettings";
import { updateTheme } from "src/state/settings/actions";

const StyledIconButton = styled(IconButton)`
  margin-right: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.palette.text.secondary};
`;

const SwitchThemeButton = () => {
  const theme = useThemeType();
  const dispatch = useDispatch();

  return (
    <>
      {theme === "dark" ? (
        <StyledIconButton
          onClick={() => {
            dispatch(updateTheme("light"));
          }}
        >
          <LightMode />
        </StyledIconButton>
      ) : (
        <StyledIconButton
          onClick={() => {
            dispatch(updateTheme("dark"));
          }}
        >
          <DarkMode />
        </StyledIconButton>
      )}
    </>
  );
};

export default SwitchThemeButton;
