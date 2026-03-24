import { describe, it, expect } from "vitest";
import type { Recipe } from "../data/recipes";
import { renderWithProviders, screen } from "../test-utils";
import RecipeCard from "./RecipeCard";

function createRecipe(overrides: Partial<Recipe> = {}): Recipe {
    return {
        id: "test-recipe",
        title: "Test Recipe",
        image: [{ title: "test", src: "/images/test.jpg" }],
        keywords: {
            type: ["манджа"],
            how: ["фурна"],
            diet: [],
            meat: [],
            dairy: [],
            plants: [],
        },
        ingredients: ["ingredient 1"],
        instructions: ["step 1"],
        servings: 4,
        workTime: 15,
        cookTime: 30,
        totalTime: 45,
        urls: [],
        ...overrides,
    };
}

describe("RecipeCard", () => {
    it("should render the recipe title", () => {
        const recipe = createRecipe({ title: "Мусака" });

        renderWithProviders(<RecipeCard recipe={recipe} />);

        expect(screen.getByText("Мусака")).toBeInTheDocument();
    });

    it("should hide workTime chip when workTime is 0", () => {
        const recipe = createRecipe({ workTime: 0 });

        const { container } = renderWithProviders(<RecipeCard recipe={recipe} />);

        // The LocalDiningIcon chip (workTime) should not be rendered
        const workTimeChips = container.querySelectorAll("[data-testid='LocalDiningIcon']");
        expect(workTimeChips).toHaveLength(0);
    });

    it("should show workTime chip when workTime is greater than 0", () => {
        const recipe = createRecipe({ workTime: 20 });

        const { container } = renderWithProviders(<RecipeCard recipe={recipe} />);

        const workTimeIcons = container.querySelectorAll("[data-testid='LocalDiningIcon']");
        expect(workTimeIcons.length).toBeGreaterThan(0);
    });

    it("should display keyword chips", () => {
        const recipe = createRecipe({
            keywords: {
                type: ["салата"],
                how: ["сурово"],
                diet: [],
                meat: [],
                dairy: [],
                plants: [],
            },
        });

        renderWithProviders(<RecipeCard recipe={recipe} />);

        expect(screen.getByText("салата")).toBeInTheDocument();
        expect(screen.getByText("сурово")).toBeInTheDocument();
    });
});

