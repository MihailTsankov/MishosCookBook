import { useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import recipes, { FILTER_CATEGORIES } from "../data/recipes";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import LanguageSwitcher from "./LanguageSwitcher";
import VineDivider from "./VineDivider";
import { useFilterSearchParams } from "../hooks/useFilterSearchParams";

export default function RecipeGrid() {
    const { t: translate } = useTranslation();
    const [filters, setFilters] = useFilterSearchParams();

    const filteredRecipes = useMemo(() => {
        const isAndMode = filters.filterMode === "AND";

        return recipes.filter((recipe) => {
            for (const { key } of FILTER_CATEGORIES) {
                const selectedValues = filters[key];
                if (selectedValues.length > 0) {
                    const recipeKeywordValues = recipe.keywords[key];
                    const categoryMatches = isAndMode
                        ? selectedValues.every((selectedValue) => recipeKeywordValues.includes(selectedValue))
                        : selectedValues.some((selectedValue) => recipeKeywordValues.includes(selectedValue));
                    if (!categoryMatches) {
                        return false;
                    }
                }
            }
            return recipe.totalTime <= filters.maxTotalTime;
        });
    }, [filters]);

    const grapesUrl = `${import.meta.env.BASE_URL ?? "/"}assets/Art Nouveau Grapes and leaves.svg`;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <LanguageSwitcher />
            </Box>
            <Box sx={{ textAlign: "center", mb: 5 }}>
                <Box
                    component="img"
                    src={grapesUrl}
                    alt=""
                    sx={{
                        width: 100,
                        height: "auto",
                        display: "inline-block",
                        mb: 1,
                        opacity: 0.85,
                    }}
                />
                <Typography variant="h3" component="h1" gutterBottom>
                    {translate("cookbook.title")}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 500, mx: "auto" }}
                >
                    {translate("cookbook.subtitle")}
                </Typography>
                <VineDivider variant="tree-banner" width={340} marginTop={3} marginBottom={1} />
            </Box>

            <RecipeFilter filters={filters} onChange={setFilters} />

            {filteredRecipes.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        {translate("cookbook.noResults")}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        {translate("cookbook.noResultsHint")}
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
