import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import type { Recipe } from "../data/recipes";
import { flattenKeywords } from "../data/recipes";

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`, {
            state: { backgroundLocation: location },
        });
    };

    return (
        <Card sx={{ maxWidth: 380, width: "100%" }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="200"
                    image={recipe.image[0]?.src}
                    alt={recipe.title}
                    sx={{ objectFit: "cover" }}
                />
                <CardContent>
                    <Typography variant="h6" gutterBottom noWrap>
                        {recipe.title}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{ mb: 1.5, minHeight: "2.6em" }}
                    >
                        {flattenKeywords(recipe.keywords)
                            .slice(0, 3)
                            .map((kw) => (
                                <Chip
                                    key={kw}
                                    label={kw}
                                    size="small"
                                    sx={{
                                        bgcolor: "secondary.light",
                                        color: "text.secondary",
                                        fontSize: "0.7rem",
                                    }}
                                />
                            ))}
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        <Chip
                            icon={<LocalDiningIcon />}
                            label={t("filter.minutesShort", { count: recipe.workTime })}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "primary.light",
                                color: "text.secondary",
                            }}
                        />
                        <Chip
                            icon={<LocalFireDepartmentIcon />}
                            label={t("filter.minutesShort", { count: recipe.cookTime })}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "secondary.main",
                                color: "text.secondary",
                            }}
                        />
                        <Chip
                            icon={<TimerIcon />}
                            label={t("filter.minutesShort", { count: recipe.totalTime })}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "#5b9bd5",
                                borderWidth: 2,
                                color: "text.secondary",
                            }}
                        />
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
