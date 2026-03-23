import {
    AppBar,
    Box,
    Chip,
    Container,
    Dialog,
    DialogContent,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Slide,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import recipes from "../data/recipes";
import { flattenKeywords } from "../data/recipes";

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<unknown> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeDialog() {
    const { t: translate } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const recipe = recipes.find((foundRecipe) => foundRecipe.id === id);

    const handleClose = () => {
        navigate("/");
    };

    // Resolve public asset path correctly when the app is served from a base path
    const getPublicAssetUrl = (source: string | undefined) => {
        if (!source) return source;
        if (source.startsWith("http") || source.startsWith("//")) return source;
        const base = import.meta.env.BASE_URL ?? "/";
        return `${base}${source.replace(/^\/+/, "")}`;
    };

    if (!recipe) {
        return (
            <Dialog
                fullScreen
                open
                onClose={handleClose}
                slots={{ transition: Transition }}
            >
                <AppBar
                    sx={{ position: "relative", bgcolor: "primary.main" }}
                    elevation={0}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                            {translate("recipe.notFound")}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h5" color="text.secondary">
                        {translate("recipe.notFoundMessage")}
                    </Typography>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog
            fullScreen
            open
            onClose={handleClose}
            slots={{ transition: Transition }}
        >
            <AppBar
                sx={{ position: "relative", bgcolor: "primary.main" }}
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                        {recipe.title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent sx={{ p: 0, bgcolor: "background.default" }}>
                {/* All Images */}
                <Stack
                    direction="row"
                    justifyContent="center"
                    flexWrap="wrap"
                    useFlexGap
                    spacing={3}
                    sx={{ px: 3, py: 3 }}
                >
                    {recipe.image.map((img) => {
                        // Reusable corner decoration – mirrored/flipped via CSS for the other 3 corners
                        const decor = (
                            <>
                                {/* Vine stem */}
                                <path
                                    d="M 22 22 C 34 38 48 52 60 60"
                                    stroke="#6b5030"
                                    strokeWidth="1.3"
                                    fill="none"
                                    opacity="0.45"
                                />
                                {/* Large leaf – outer corner, points fully outside image */}
                                <path
                                    d="M 22 22 C 16 8 6 2 2 2 C 2 6 8 16 22 22 Z"
                                    fill="#7fb89a"
                                    opacity="0.92"
                                />
                                <path
                                    d="M 22 22 C 13 13 5 5 2 2"
                                    stroke="#4a8a6a"
                                    strokeWidth="0.9"
                                    fill="none"
                                    opacity="0.65"
                                />
                                {/* Medium leaf – sweeps right, tip just outside image */}
                                <path
                                    d="M 22 22 C 30 8 46 6 52 16 C 40 24 26 26 22 22 Z"
                                    fill="#a8d5ba"
                                    opacity="0.88"
                                />
                                <path
                                    d="M 22 22 C 34 12 46 8 52 16"
                                    stroke="#6aaa8a"
                                    strokeWidth="0.75"
                                    fill="none"
                                    opacity="0.6"
                                />
                                {/* Small inner leaf – overlaps image corner */}
                                <path
                                    d="M 40 40 C 46 30 58 32 56 44 C 48 48 38 46 40 40 Z"
                                    fill="#c8e6d0"
                                    opacity="0.82"
                                />
                                <path
                                    d="M 40 40 C 48 33 56 34 56 44"
                                    stroke="#8ac8a8"
                                    strokeWidth="0.65"
                                    fill="none"
                                    opacity="0.55"
                                />
                                {/* Tiny bud tip on inner leaf */}
                                <circle
                                    cx="56"
                                    cy="44"
                                    r="2.2"
                                    fill="#a8d5ba"
                                    opacity="0.7"
                                />
                                {/* ── Art deco wavy lines (overlap image) ── */}
                                <path
                                    d="M 15 62 Q 29 53 43 62 Q 57 71 71 62 Q 85 53 99 62"
                                    stroke="#d4af37"
                                    strokeWidth="1.45"
                                    fill="none"
                                    opacity="0.72"
                                />
                                <path
                                    d="M 15 70 Q 29 61 43 70 Q 57 79 71 70 Q 85 61 99 70"
                                    stroke="#c5984b"
                                    strokeWidth="1.15"
                                    fill="none"
                                    opacity="0.58"
                                />
                                <path
                                    d="M 15 77 Q 29 68 43 77 Q 57 86 71 77 Q 85 68 96 77"
                                    stroke="#d4af37"
                                    strokeWidth="0.85"
                                    fill="none"
                                    opacity="0.4"
                                />
                                {/* Corner jewel */}
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="3"
                                    fill="#d4af37"
                                    opacity="0.82"
                                />
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="5.5"
                                    fill="none"
                                    stroke="#d4af37"
                                    strokeWidth="0.85"
                                    opacity="0.45"
                                />
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="9"
                                    fill="none"
                                    stroke="#d4af37"
                                    strokeWidth="0.55"
                                    strokeDasharray="2 3"
                                    opacity="0.28"
                                />
                            </>
                        );

                        return (
                            <Box
                                key={img.src}
                                sx={{
                                    position: "relative",
                                    p: "40px",
                                    transition: "transform 0.35s ease, z-index 0s",
                                    zIndex: 0,
                                    "&:hover": {
                                        transform: "scale(1.5)",
                                        zIndex: 10,
                                    },
                                }}
                            >
                                {/* top-left */}
                                <svg
                                    width="110"
                                    height="110"
                                    viewBox="0 0 110 110"
                                    style={{
                                        position: "absolute",
                                        top: -12,
                                        left: -12,
                                        zIndex: 2,
                                        pointerEvents: "none",
                                    }}
                                >
                                    {decor}
                                </svg>
                                {/* top-right – mirror X */}
                                <svg
                                    width="110"
                                    height="110"
                                    viewBox="0 0 110 110"
                                    style={{
                                        position: "absolute",
                                        top: -12,
                                        right: -12,
                                        zIndex: 2,
                                        pointerEvents: "none",
                                        transform: "scaleX(-1)",
                                    }}
                                >
                                    {decor}
                                </svg>
                                {/* bottom-left – mirror Y */}
                                <svg
                                    width="110"
                                    height="110"
                                    viewBox="0 0 110 110"
                                    style={{
                                        position: "absolute",
                                        bottom: -12,
                                        left: -12,
                                        zIndex: 2,
                                        pointerEvents: "none",
                                        transform: "scaleY(-1)",
                                    }}
                                >
                                    {decor}
                                </svg>
                                {/* bottom-right – rotate 180 */}
                                <svg
                                    width="110"
                                    height="110"
                                    viewBox="0 0 110 110"
                                    style={{
                                        position: "absolute",
                                        bottom: -12,
                                        right: -12,
                                        zIndex: 2,
                                        pointerEvents: "none",
                                        transform: "scale(-1,-1)",
                                    }}
                                >
                                    {decor}
                                </svg>

                                <Box
                                    component="img"
                                    src={getPublicAssetUrl(img.src)}
                                    alt={img.title ?? recipe.title}
                                    sx={{
                                        position: "relative",
                                        height: 350,
                                        maxWidth: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        borderRadius: "4px",
                                        boxShadow:
                                            "0 4px 24px rgba(0,0,0,0.12)",
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Stack>

                <Container maxWidth="md" sx={{ py: 4 }}>
                    {/* Title & Keywords */}
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {recipe.title}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={0.75}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{ mb: 3 }}
                    >
                        {flattenKeywords(recipe.keywords).map((keyword) => (
                            <Chip
                                key={keyword}
                                label={keyword}
                                size="small"
                                sx={{
                                    bgcolor: "secondary.light",
                                    color: "text.secondary",
                                }}
                            />
                        ))}
                    </Stack>

                    {/* Meta Chips */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ mb: 4 }}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        <Chip
                            icon={<LocalDiningIcon />}
                            label={translate("recipe.work", { count: recipe.workTime })}
                            sx={{
                                bgcolor: "primary.light",
                                color: "#fff",
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            icon={<LocalFireDepartmentIcon />}
                            label={translate("recipe.cook", { count: recipe.cookTime })}
                            sx={{
                                bgcolor: "secondary.main",
                                color: "#fff",
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            icon={<TimerIcon />}
                            label={translate("recipe.total", { count: recipe.totalTime })}
                            variant="outlined"
                            sx={{
                                borderColor: "#5b9bd5",
                                borderWidth: 2,
                                color: "#5b9bd5",
                                fontWeight: 500,
                            }}
                        />
                        {recipe.servings > 0 && (
                            <Chip
                                icon={<PeopleIcon />}
                                label={translate("recipe.serves", { count: recipe.servings })}
                                variant="outlined"
                                sx={{ fontWeight: 500 }}
                            />
                        )}
                    </Stack>

                    {/* Ingredients */}
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                        {translate("recipe.ingredients")}
                    </Typography>
                    <List dense>
                        {recipe.ingredients.map((item, index) => (
                            <ListItem key={index} sx={{ py: 0.3 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                    <FiberManualRecordIcon
                                        sx={{
                                            fontSize: 8,
                                            color: "primary.main",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>

                    {/* Instructions */}
                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                        {translate("recipe.instructions")}
                    </Typography>
                    <List>
                        {recipe.instructions.map((step, index) => (
                            <ListItem
                                key={index}
                                sx={{ alignItems: "flex-start", py: 1 }}
                            >
                                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: "50%",
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 13,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {index + 1}
                                    </Box>
                                </ListItemIcon>
                                <ListItemText primary={step} />
                            </ListItem>
                        ))}
                    </List>

                    {/* Links */}
                    {recipe.urls.length > 0 && (
                        <>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ mt: 4 }}
                            >
                                {translate("recipe.links")}
                            </Typography>
                            <List dense>
                                {recipe.urls.map((recipeUrl) => {
                                    let urlLabel: string;
                                    try {
                                        urlLabel = new URL(recipeUrl).hostname.replace(
                                            /^www\./,
                                            "",
                                        );
                                    } catch {
                                        urlLabel = recipeUrl;
                                    }
                                    return (
                                        <ListItem key={recipeUrl} sx={{ py: 0.3 }}>
                                            <ListItemIcon
                                                sx={{ minWidth: 28 }}
                                            >
                                                <LinkIcon
                                                    sx={{
                                                        fontSize: 18,
                                                        color: "primary.main",
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Link
                                                        href={recipeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        underline="hover"
                                                        color="primary.dark"
                                                    >
                                                        {urlLabel}
                                                    </Link>
                                                }
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </>
                    )}
                </Container>
            </DialogContent>
        </Dialog>
    );
}
