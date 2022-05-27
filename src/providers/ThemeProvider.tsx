import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { useThemeType } from "src/hooks/useSettings";
import { ThemeType } from "src/state/settings/reducer";

declare module "@mui/material/styles/createPalette" {
  export interface TypeBackground {
    default: string;
    paper: string;
    dark: string;
    darker: string;
    background: string;
  }
}

const darkTheme: ThemeOptions = createTheme({
  typography: {
    fontFamily: ["roboto"].join(","),
  },
  palette: {
    mode: "dark",
    divider: "#4A576D",
    text: {
      primary: "#FFFFFF",
      secondary: "#ccc",
    },
    primary: {
      main: "#00BD8A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#20B3E1",
      contrastText: "#181c25",
    },
    background: {
      default: "#29303D",
      paper: "#394456",
      dark: "#212731",
      darker: "#1C212A",
      background: "#191D24",
    },
    action: {
      disabledBackground: "#4F5D75",
      disabled: "rgba(255,255,255,0.2)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: "bold",
          ":disabled": "#1F808D",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#212731",
          scrollbarColor: "#1F808D #2D3142",
          backgroundRepeat: "stretch",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const lightTheme: ThemeOptions = createTheme({
  ...darkTheme,
  palette: {
    mode: "light",
    divider: "#AAB4C5",
    text: {
      primary: "#2B4A5D",
      secondary: "#555555",
    },
    primary: {
      main: "#00CC96",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F9BC35",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FDFDFD",
      dark: "#E2EDF3",
      darker: "#FFFFFF",
      background: "#2B4A5D",
    },
    action: {
      disabledBackground: "rgba(185, 198, 223, 0.3)",
      disabled: "#ABBBD8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: "bold",
          ":disabled": "#1F808D",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F1F6F9",
          scrollbarColor: "#1F808D #FFFFFF",
          backgroundRepeat: "stretch",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const CustomThemeProvider = ({ children }: any) => {
  const theme: ThemeType = useThemeType() ?? "dark";

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
