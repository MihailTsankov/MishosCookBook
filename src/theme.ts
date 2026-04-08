import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5c7a56",
            light: "#8aad83",
            dark: "#3d5438",
        },
        secondary: {
            main: "#c9a84c",
            light: "#e0cc8a",
            dark: "#a08632",
        },
        background: {
            default: "#f5f0e6",
            paper: "#faf8f2",
        },
        text: {
            primary: "#2d2a24",
            secondary: "#201d1d",
        },
    },
    typography: {
        /* Cormorant renders visually smaller than sans-serif at equal CSS sizes,
           so we bump the global base and every variant accordingly. */
        fontSize: 16,
        fontFamily: '"Alice", "Cormorant", "Garamond", "Georgia", serif',
        h3: {
            fontFamily: '"Alice", "Cinzel", "Cormorant", serif',
            fontWeight: 600,
            fontSize: "2.4rem",
            letterSpacing: "0.04em",
            color: "#2d2a24",
        },
        h4: {
            fontFamily: '"Alice", "Cinzel", "Cormorant", serif',
            fontWeight: 600,
            fontSize: "2rem",
            letterSpacing: "0.03em",
        },
        h5: {
            fontFamily: '"Alice", "Cinzel", "Cormorant", serif',
            fontWeight: 600,
            fontSize: "1.6rem",
            letterSpacing: "0.02em",
        },
        h6: {
            fontFamily: '"Alice", "Cinzel", "Cormorant", serif',
            fontWeight: 500,
            fontSize: "1.35rem",
        },
        body1: {
            fontSize: "1.2rem",
        },
        body2: {
            fontSize: "1.1rem",
        },
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: "1.05rem",
                    height: 36,
                },
                sizeSmall: {
                    fontSize: "0.95rem",
                    height: 30,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    border: "1px solid rgba(92, 122, 86, 0.15)",
                    boxShadow: "0 2px 8px rgba(45, 42, 36, 0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 20px rgba(45, 42, 36, 0.12)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 4,
                },
            },
        },
    },
});

export default theme;
