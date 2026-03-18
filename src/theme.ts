import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e8907e",
      light: "#f4b8ad",
      dark: "#c96f5e",
    },
    secondary: {
      main: "#a8d5ba",
      light: "#c8e6d0",
      dark: "#7fb89a",
    },
    background: {
      default: "#fdf6f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#4a4a4a",
      secondary: "#7a7a7a",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      color: "#4a4a4a",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;

