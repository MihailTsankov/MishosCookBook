import { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const SCROLL_THRESHOLD = 300;

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const { t: translate } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > SCROLL_THRESHOLD);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible) return null;

    return (
        <IconButton
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                width: 56,
                height: 56,
                zIndex: 1300,
                padding: 0,
                "&:hover": { opacity: 0.85 },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={`${import.meta.env.BASE_URL}assets/leaf-bullet.svg`}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                />
                <Box
                    component="span"
                    sx={{
                        position: "absolute",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        color: "#fff",
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                        userSelect: "none",
                        lineHeight: 1,
                        mt: "2px",
                    }}
                >
                    {translate("scrollToTop")}
                </Box>
            </Box>
        </IconButton>
    );
}

