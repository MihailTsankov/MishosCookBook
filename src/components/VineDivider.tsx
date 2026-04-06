import { Box } from "@mui/material";

type DividerVariant = "tree-banner" | "decorative-header" | "vine";

const VARIANT_ASSETS: Record<DividerVariant, string> = {
    "tree-banner": "assets/Art Nouveau Steren-Twisted-Tree-Banner.svg",
    "decorative-header": "assets/art-nouveau-Decorative-Herader-5--Arvin61r58.svg",
    vine: "assets/vine-divider.svg",
};

/** CSS filter that re-colours black (#000) paths to forest green (~#5c7a56). */
const GREEN_TINT_FILTER =
    "brightness(0) saturate(100%) invert(47%) sepia(11%) saturate(800%) hue-rotate(82deg) brightness(92%) contrast(88%)";

interface VineDividerProps {
    width?: number;
    marginTop?: number;
    marginBottom?: number;
    opacity?: number;
    variant?: DividerVariant;
}

export default function VineDivider({
    width = 220,
    marginTop = 2,
    marginBottom = 2,
    opacity = 0.45,
    variant = "tree-banner",
}: VineDividerProps) {
    const base = import.meta.env.BASE_URL ?? "/";
    const publicAssetUrl = `${base}${VARIANT_ASSETS[variant]}`;

    /* The tree-banner and decorative-header SVGs are solid black —
       we apply a CSS filter to tint them to the theme's forest green. */
    const needsTint = variant !== "vine";

    return (
        <Box
            sx={{
                textAlign: "center",
                mt: marginTop,
                mb: marginBottom,
                opacity,
                transition: "opacity 0.3s ease",
                "&:hover": { opacity: Math.min(opacity + 0.15, 1) },
            }}
        >
            <img
                src={publicAssetUrl}
                alt=""
                style={{
                    width,
                    height: "auto",
                    display: "inline-block",
                    ...(needsTint ? { filter: GREEN_TINT_FILTER } : {}),
                }}
            />
        </Box>
    );
}
