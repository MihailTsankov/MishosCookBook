import type { RecipeKeywords } from "../data/recipes";

export type FilterMode = "AND" | "OR";

export type ActiveFilters = Record<keyof RecipeKeywords, string[]> & {
    maxTotalTime: number;
    filterMode: FilterMode;
};

export const MAX_TIME_SLIDER = 180;

export const EMPTY_FILTERS: ActiveFilters = {
    type: [],
    how: [],
    diet: [],
    meat: [],
    dairy: [],
    plants: [],
    maxTotalTime: Infinity,
    filterMode: "AND",
};
