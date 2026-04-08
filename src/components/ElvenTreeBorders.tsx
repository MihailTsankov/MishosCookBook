import Box from "@mui/material/Box";

/**
 * Decorative fixed-position elven tree SVGs flanking the viewport.
 *
 * - elven-tree-right.svg is placed on the LEFT edge
 * - elven-tree-left.svg  is placed on the RIGHT edge
 *
 * They stay in place while the user scrolls and are hidden on narrow screens
 * so they don't overlap the content.
 */

const SHARED_STYLES = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    height: "92vh",
    width: "auto",
    pointerEvents: "none",
    /* Must sit above MUI Dialog (z-index 1300) so the trees
       remain visible on fullscreen recipe pages. */
    zIndex: 1301,
    opacity: 0.18,
    /* Recolour the black SVG to the same forest green as the other SVGs (see App.css) */
    filter:
        "brightness(0) saturate(100%) invert(47%) sepia(11%) saturate(800%) hue-rotate(82deg) brightness(92%) contrast(88%)",
    display: { xs: "none", md: "block" },
} as const;

const BASE_URL = import.meta.env.BASE_URL ?? "/";

export default function ElvenTreeBorders() {
    return (
        <>
            {/* Right-hand tree on the LEFT side of the viewport */}
            <Box
                component="img"
                src={`${BASE_URL}assets/elven-tree-right.svg`}
                alt=""
                aria-hidden="true"
                sx={{
                    ...SHARED_STYLES,
                    left: 0,
                }}
            />

            {/* Left-hand tree on the RIGHT side of the viewport */}
            <Box
                component="img"
                src={`${BASE_URL}assets/elven-tree-left.svg`}
                alt=""
                aria-hidden="true"
                sx={{
                    ...SHARED_STYLES,
                    right: 0,
                }}
            />
        </>
    );
}
