import { describe, it, expect } from "vitest";
import { flattenKeywords } from "./recipes";
import type { RecipeKeywords } from "./recipes";

describe("flattenKeywords", () => {
    it("should return all keywords from every category in order", () => {
        const keywords: RecipeKeywords = {
            type: ["манджа"],
            how: ["фурна"],
            diet: ["вегетарианско"],
            meat: [],
            dairy: ["сирене"],
            plants: ["картофи", "домати"],
        };

        const result = flattenKeywords(keywords);

        expect(result).toEqual(["манджа", "фурна", "вегетарианско", "сирене", "картофи", "домати"]);
    });

    it("should return an empty array when all categories are empty", () => {
        const keywords: RecipeKeywords = {
            type: [],
            how: [],
            diet: [],
            meat: [],
            dairy: [],
            plants: [],
        };

        const result = flattenKeywords(keywords);

        expect(result).toEqual([]);
    });

    it("should handle a single populated category", () => {
        const keywords: RecipeKeywords = {
            type: [],
            how: ["тиган", "котлон"],
            diet: [],
            meat: [],
            dairy: [],
            plants: [],
        };

        const result = flattenKeywords(keywords);

        expect(result).toEqual(["тиган", "котлон"]);
    });
});

