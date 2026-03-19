import { useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useTranslation } from "react-i18next";
import recipes, { FILTER_CATEGORIES } from "../data/recipes";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import LanguageSwitcher from "./LanguageSwitcher";
import type { ActiveFilters } from "../types/filters";
import { EMPTY_FILTERS } from "../types/filters";

export default function RecipeGrid() {
    const { t } = useTranslation();
    const [filters, setFilters] = useState<ActiveFilters>({ ...EMPTY_FILTERS });

    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            // Check each keyword category: recipe must match at least one selected value
            for (const { key } of FILTER_CATEGORIES) {
                const selected = filters[key];
                if (selected.length > 0) {
                    const recipeValues = recipe.keywords[key];
                    if (!selected.some((v) => recipeValues.includes(v))) {
                        return false;
                    }
                }
            }
            // Check time
            return recipe.totalTime <= filters.maxTotalTime;
        });
    }, [filters]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <LanguageSwitcher />
            </Box>
            <Box sx={{ textAlign: "center", mb: 5 }}>
                <RestaurantMenuIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h3" component="h1" gutterBottom>
                    {t("cookbook.title")}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 500, mx: "auto" }}
                >
                    {t("cookbook.subtitle")}
                </Typography>
            </Box>

            <RecipeFilter filters={filters} onChange={setFilters} />

            {filteredRecipes.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        {t("cookbook.noResults")}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        {t("cookbook.noResultsHint")}
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                        justifyItems: "center",
                    }}
                >
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </Box>
            )}
        </Container>
    );
}
