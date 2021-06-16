import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#e1f5fe",
      white: "#fff",
    },
    primary: {
      light: "#03A9F4",
      main: "#0277BD",
      dark: "#011B42",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FF0000",
      dark: "#ba000d",
      contrastText: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#fff",
      hint: "#fff",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText011B42: "#fff",
    },
    error: {
      light: "#ff7961",
      main: "#FF0000",
      dark: "#ba000d",
      contrastText: "#fff",
    },
    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "#000",
    },
    info: {
      light: "#03A9F4",
      main: "#0277BD",
      dark: "#011B42",
      contrastText: "#fff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.54)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.8,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    background: {
      default: "#F6F7F9",
      paper: "#fff",
    },
  },
});

export default theme;
