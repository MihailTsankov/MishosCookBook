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
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import recipes from "../data/recipes";
import { flattenKeywords } from "../data/recipes";
import VineDivider from "./VineDivider";

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

    const leafBulletUrl = getPublicAssetUrl("assets/art-nouveau-smallflowerorn.svg");

    if (!recipe) {
        return (
            <Dialog
                fullScreen
                open
                onClose={handleClose}
                slots={{ transition: Transition }}
            >
                <AppBar
                    sx={{
                        position: "relative",
                        bgcolor: "#3d5438",
                        backgroundImage: "linear-gradient(135deg, #3d5438 0%, #5c7a56 100%)",
                    }}
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
                        <Typography
                            sx={{
                                ml: 2,
                                flex: 1,
                                fontFamily: '"Cinzel", serif',
                                letterSpacing: "0.03em",
                            }}
                            variant="h6"
                        >
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
                sx={{
                    position: "relative",
                    bgcolor: "#3d5438",
                    backgroundImage: "linear-gradient(135deg, #3d5438 0%, #5c7a56 100%)",
                }}
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
                    <Typography
                        sx={{
                            ml: 2,
                            flex: 1,
                            fontFamily: '"Cinzel", serif',
                            letterSpacing: "0.03em",
                        }}
                        variant="h6"
                    >
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
                    {recipe.image.map((image) => {
                        // Art-nouveau corner ornament from art-nouveau-corner.svg
                        const cornerSvgUrl = getPublicAssetUrl(
                            "assets/art-nouveau-corner.svg",
                        );
                        const cornerStyle: React.CSSProperties = {
                            position: "absolute",
                            width: 80,
                            height: 80,
                            zIndex: 2,
                            pointerEvents: "none",
                        };

                        return (
                            <Box
                                key={image.src}
                                sx={{
                                    position: "relative",
                                    p: "40px",
                                    transition: "transform 0.35s ease, z-index 0s",
                                    zIndex: 0,
                                    "&:hover": {
                                        transform: "scale(1.2)",
                                        zIndex: 10,
                                    },
                                }}
                            >
                                {/* top-left */}
                                <img
                                    src={cornerSvgUrl}
                                    alt=""
                                    style={{
                                        ...cornerStyle,
                                        top: 5,
                                        left: 5,
                                    }}
                                />
                                {/* top-right – mirror X */}
                                <img
                                    src={cornerSvgUrl}
                                    alt=""
                                    style={{
                                        ...cornerStyle,
                                        top: 5,
                                        right: 5,
                                        transform: "scaleX(-1)",
                                    }}
                                />
                                {/* bottom-left – mirror Y */}
                                <img
                                    src={cornerSvgUrl}
                                    alt=""
                                    style={{
                                        ...cornerStyle,
                                        bottom: 5,
                                        left: 5,
                                        transform: "scaleY(-1)",
                                    }}
                                />
                                {/* bottom-right – rotate 180 */}
                                <img
                                    src={cornerSvgUrl}
                                    alt=""
                                    style={{
                                        ...cornerStyle,
                                        bottom: 5,
                                        right: 5,
                                        transform: "scale(-1, -1)",
                                    }}
                                />

                                <Box
                                    component="img"
                                    src={getPublicAssetUrl(image.src)}
                                    alt={image.title ?? recipe.title}
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
                        {flattenKeywords(recipe.keywords).map((keyword, index) => (
                            <Chip
                                key={`${keyword}-${index}`}
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
                        {recipe.workTime > 0 && (
                            <Chip
                                icon={<LocalDiningIcon />}
                                label={translate("recipe.work", { count: recipe.workTime })}
                                sx={{
                                    bgcolor: "primary.light",
                                    color: "#fff",
                                    fontWeight: 500,
                                }}
                            />
                        )}
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
                                borderColor: "secondary.dark",
                                borderWidth: 2,
                                color: "secondary.dark",
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

                    <VineDivider variant="decorative-header" width={300} marginTop={1} marginBottom={2} opacity={0.35} />

                    {/* Ingredients */}
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                        {translate("recipe.ingredients")}
                    </Typography>
                    <List dense>
                        {recipe.ingredients.map((item, index) => (
                            <ListItem key={index} sx={{ py: 0.3 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                    <img
                                        src={leafBulletUrl}
                                        alt=""
                                        style={{
                                            width: 16,
                                            height: 16,
                                            filter: "brightness(0) saturate(100%) invert(47%) sepia(11%) saturate(800%) hue-rotate(82deg) brightness(92%) contrast(88%)",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>

                    <VineDivider variant="tree-banner" width={280} marginTop={2} marginBottom={1} opacity={0.35} />

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
                                            width: 26,
                                            height: 26,
                                            borderRadius: "50%",
                                            bgcolor: "transparent",
                                            border: "2px solid",
                                            borderColor: "primary.main",
                                            color: "primary.main",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            fontFamily: '"Cinzel", serif',
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
                            <VineDivider variant="decorative-header" width={280} marginTop={2} marginBottom={1} opacity={0.35} />

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
