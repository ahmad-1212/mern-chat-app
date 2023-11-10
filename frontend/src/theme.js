import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AC25FE",
      dark: "#881FC8",
    },
    secondary: {
      light: "#E3EFFC",
      main: "#0066D6",
      dark: "#004EA3",
    },
    grey: {
      light: "#F9F9F9",
      main: "#f4f4f4",
      dark: "#E3E3E3",
    },
    text: {
      primary: "#575757",
      secondary: "#575757",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans serif"].join(","),
    fontSize: 10,
  },
});

export default theme;
