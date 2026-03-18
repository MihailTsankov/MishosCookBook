import {
    AppBar,
    Box,
    Chip,
    Container,
    Dialog,
    DialogContent,
    IconButton,
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
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { forwardRef } from "react";
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
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const recipe = recipes.find((r) => r.id === id);

    const handleClose = () => {
        navigate("/");
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
                            Recipe Not Found
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
                        Sorry, we couldn't find that recipe.
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
                {/* Hero Image */}
                <Box
                    sx={{
                        width: "100%",
                        maxHeight: 400,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        component="img"
                        src={recipe.image}
                        alt={recipe.title}
                        sx={{
                            width: "100%",
                            height: 400,
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                </Box>

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
                        {flattenKeywords(recipe.keywords).map((kw) => (
                            <Chip
                                key={kw}
                                label={kw}
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
                            label={`Work: ${recipe.workTime} min`}
                            sx={{
                                bgcolor: "primary.light",
                                color: "#fff",
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            icon={<LocalFireDepartmentIcon />}
                            label={`Cook: ${recipe.cookTime} min`}
                            sx={{
                                bgcolor: "secondary.main",
                                color: "#fff",
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            icon={<TimerIcon />}
                            label={`Total: ${recipe.totalTime} min`}
                            variant="outlined"
                            sx={{
                                borderColor: "#5b9bd5",
                                borderWidth: 2,
                                color: "#5b9bd5",
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            icon={<PeopleIcon />}
                            label={`Serves ${recipe.servings}`}
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                        />
                    </Stack>

                    {/* Ingredients */}
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                        Ingredients
                    </Typography>
                    <List dense>
                        {recipe.ingredients.map((item, i) => (
                            <ListItem key={i} sx={{ py: 0.3 }}>
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
                        Instructions
                    </Typography>
                    <List>
                        {recipe.instructions.map((step, i) => (
                            <ListItem
                                key={i}
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
                                        {i + 1}
                                    </Box>
                                </ListItemIcon>
                                <ListItemText primary={step} />
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </DialogContent>
        </Dialog>
    );
}
