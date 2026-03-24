import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen } from "../test-utils";
import RecipeDialog from "./RecipeDialog";

// Mock the recipes module so we can control which recipe is found
vi.mock("../data/recipes", async () => {
    const actual = await vi.importActual<typeof import("../data/recipes")>("../data/recipes");
    return {
        ...actual,
        default: [
            {
                id: "test-recipe",
                title: "Test Dialog Recipe",
                image: [{ title: "test", src: "/images/test.jpg" }],
                keywords: {
                    type: ["манджа"],
                    how: ["фурна"],
                    diet: [],
                    meat: [],
                    dairy: [],
                    plants: [],
                },
                ingredients: ["ingredient 1", "ingredient 2"],
                instructions: ["step 1", "step 2"],
                servings: 4,
                workTime: 20,
                cookTime: 40,
                totalTime: 60,
                urls: ["https://example.com"],
            },
            {
                id: "zero-times",
                title: "Zero Times Recipe",
                image: [],
                keywords: {
                    type: [],
                    how: [],
                    diet: [],
                    meat: [],
                    dairy: [],
                    plants: [],
                },
                ingredients: ["water"],
                instructions: ["boil"],
                servings: 0,
                workTime: 0,
                cookTime: 10,
                totalTime: 10,
                urls: [],
            },
        ],
    };
});

describe("RecipeDialog", () => {
    it("should render recipe title when recipe is found", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/test-recipe"],
            routePath: "/recipe/:id",
        });

        const titleElements = screen.getAllByText("Test Dialog Recipe");
        expect(titleElements.length).toBeGreaterThanOrEqual(1);
    });

    it("should show workTime chip when workTime is greater than 0", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/test-recipe"],
            routePath: "/recipe/:id",
        });

        const workTimeIcons = document.querySelectorAll("[data-testid='LocalDiningIcon']");
        expect(workTimeIcons.length).toBeGreaterThan(0);
    });

    it("should hide workTime chip when workTime is 0", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/zero-times"],
            routePath: "/recipe/:id",
        });

        const workTimeIcons = document.querySelectorAll("[data-testid='LocalDiningIcon']");
        expect(workTimeIcons).toHaveLength(0);
    });

    it("should show servings chip when servings is greater than 0", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/test-recipe"],
            routePath: "/recipe/:id",
        });

        const servingsIcons = document.querySelectorAll("[data-testid='PeopleIcon']");
        expect(servingsIcons.length).toBeGreaterThan(0);
    });

    it("should hide servings chip when servings is 0", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/zero-times"],
            routePath: "/recipe/:id",
        });

        const servingsIcons = document.querySelectorAll("[data-testid='PeopleIcon']");
        expect(servingsIcons).toHaveLength(0);
    });

    it("should display ingredients", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/test-recipe"],
            routePath: "/recipe/:id",
        });

        expect(screen.getByText("ingredient 1")).toBeInTheDocument();
        expect(screen.getByText("ingredient 2")).toBeInTheDocument();
    });

    it("should display instructions", () => {
        renderWithProviders(<RecipeDialog />, {
            initialEntries: ["/recipe/test-recipe"],
            routePath: "/recipe/:id",
        });

        expect(screen.getByText("step 1")).toBeInTheDocument();
        expect(screen.getByText("step 2")).toBeInTheDocument();
    });
});



