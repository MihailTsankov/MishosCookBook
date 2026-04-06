import { useState } from "react";
import {
    Box,
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
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TimerIcon from "@mui/icons-material/Timer";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import type { Recipe } from "../data/recipes";
import { flattenKeywords } from "../data/recipes";

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { t: translate } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [imageLoadFailed, setImageLoadFailed] = useState(false);

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`, {
            state: { backgroundLocation: location },
        });
    };

    const handleImageError = () => {
        setImageLoadFailed(true);
    };

    // Resolve public asset path correctly when the app is served from a base path
    const getPublicAssetUrl = (source: string | undefined) => {
        if (!source) return source;
        if (source.startsWith("http") || source.startsWith("//")) return source;
        const base = import.meta.env.BASE_URL ?? "/";
        return `${base}${source.replace(/^\/+/, "")}`;
    };

    const hasValidImage = recipe.image[0]?.src && !imageLoadFailed;

    return (
        <Card sx={{ maxWidth: 380, width: "100%" }}>
            <CardActionArea onClick={handleClick}>
                {hasValidImage ? (
                    <CardMedia
                        component="img"
                        height="200"
                        image={getPublicAssetUrl(recipe.image[0].src)}
                        alt={recipe.title}
                        onError={handleImageError}
                        sx={{ objectFit: "cover" }}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 200,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "secondary.light",
                        }}
                    >
                        <RestaurantMenuIcon
                            sx={{ fontSize: 72, color: "secondary.dark", opacity: 0.5 }}
                        />
                    </Box>
                )}
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
                            .map((keyword) => (
                                <Chip
                                    key={keyword}
                                    label={keyword}
                                    size="small"
                                    sx={{
                                        bgcolor: "secondary.light",
                                        color: "text.secondary",
                                        fontSize: "1.05rem",
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
                        {recipe.workTime > 0 && (
                            <Chip
                                icon={<LocalDiningIcon />}
                                label={translate("filter.minutesShort", { count: recipe.workTime })}
                                size="small"
                                variant="outlined"
                                sx={{
                                    borderColor: "primary.light",
                                    color: "text.secondary",
                                }}
                            />
                        )}
                        <Chip
                            icon={<LocalFireDepartmentIcon />}
                            label={translate("filter.minutesShort", { count: recipe.cookTime })}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "secondary.main",
                                color: "text.secondary",
                            }}
                        />
                        <Chip
                            icon={<TimerIcon />}
                            label={translate("filter.minutesShort", { count: recipe.totalTime })}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "secondary.main",
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
