import type { RecipeKeywords } from "../data/recipes";

export type ActiveFilters = Record<keyof RecipeKeywords, string[]> & {
  maxTotalTime: number;
};

export const EMPTY_FILTERS: ActiveFilters = {
  type: [],
  how: [],
  meat: [],
  dairy: [],
  plants: [],
  maxTotalTime: 60,
};

