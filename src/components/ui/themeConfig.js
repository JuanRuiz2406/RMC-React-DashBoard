import { createMuiTheme} from "@material-ui/core/styles"


const theme = createMuiTheme({
    palette: {
    common: {
        black: '#fff',
        white: '#fff',
    },
      primary: {
        light: '#03A9F4',
        main: '#0277BD',
        dark: '#011B42',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#FF0000',
        dark: '#ba000d',
        contrastText: '#fff',
      },
      text: {
        primary: '#fff',
        secondary: '#fff',
        disabled: '#fff',
        hint: '#fff',
      },
      action: {
        active: '#fff',
        hover: '#FFFFFF',
        hoverOpacity: 0.08,
        selected: '#FFFFFF',
        selectedOpacity: 0.16,
        disabled: '#FFFFFF',
        disabledBackground:'#FFFFFF',
        disabledOpacity: 0.38,
        focus: '#FFFFFF',
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
      },
    },
  });

  export default theme;
