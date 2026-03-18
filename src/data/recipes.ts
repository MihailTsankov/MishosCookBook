export interface RecipeKeywords {
  type: string[];
  how: string[];
  meat: string[];
  dairy: string[];
  plants: string[];
}

export const FILTER_CATEGORIES: { key: keyof RecipeKeywords; label: string }[] = [
  { key: "type", label: "Type" },
  { key: "how", label: "How" },
  { key: "meat", label: "Meat" },
  { key: "dairy", label: "Dairy" },
  { key: "plants", label: "Plants" },
];

export interface Recipe {
  id: string;
  title: string;
  image: string;
  keywords: RecipeKeywords;
  ingredients: string[];
  instructions: string[];
  servings: number;
  workTime: number;
  cookTime: number;
  totalTime: number;
}

const recipes: Recipe[] = [
  {
    id: "creamy-tomato-pasta",
    title: "Creamy Tomato Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format",
    keywords: {
      type: ["dinner"],
      how: ["boil", "simmer"],
      meat: ["vegetarian"],
      dairy: ["cream", "cheese"],
      plants: ["pasta", "tomato", "garlic"],
    },
    ingredients: [
      "400g penne pasta",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 can (400g) crushed tomatoes",
      "120ml heavy cream",
      "1 tsp dried oregano",
      "Fresh basil leaves",
      "Salt and pepper to taste",
      "Parmesan cheese for serving",
    ],
    instructions: [
      "Cook pasta according to package directions. Drain and set aside.",
      "Heat olive oil in a large pan over medium heat. Sauté garlic for 1 minute until fragrant.",
      "Add crushed tomatoes and oregano. Simmer for 10 minutes.",
      "Stir in the heavy cream and season with salt and pepper.",
      "Toss the cooked pasta into the sauce until well coated.",
      "Serve topped with fresh basil and grated Parmesan.",
    ],
    servings: 4,
    workTime: 10,
    cookTime: 20,
    totalTime: 25,
  },
  {
    id: "thai-green-curry",
    title: "Thai Green Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format",
    keywords: {
      type: ["dinner"],
      how: ["stir-fry", "simmer"],
      meat: ["chicken"],
      dairy: [],
      plants: ["bamboo shoots", "bell pepper", "green beans", "rice"],
    },
    ingredients: [
      "500g chicken breast, sliced",
      "2 tbsp green curry paste",
      "400ml coconut milk",
      "1 cup bamboo shoots",
      "1 red bell pepper, sliced",
      "1 cup green beans, trimmed",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "Thai basil leaves",
      "Steamed jasmine rice for serving",
    ],
    instructions: [
      "Heat a splash of oil in a wok over high heat. Cook chicken until golden, about 5 minutes. Remove and set aside.",
      "In the same wok, fry the curry paste for 1 minute until fragrant.",
      "Pour in the coconut milk and bring to a simmer.",
      "Add bamboo shoots, bell pepper, and green beans. Cook for 5 minutes.",
      "Return chicken to the wok. Stir in fish sauce and sugar.",
      "Simmer for another 5 minutes. Garnish with Thai basil and serve with rice.",
    ],
    servings: 4,
    workTime: 15,
    cookTime: 20,
    totalTime: 30,
  },
  {
    id: "classic-caesar-salad",
    title: "Classic Caesar Salad",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format",
    keywords: {
      type: ["lunch", "side"],
      how: ["no cooking"],
      meat: ["vegetarian"],
      dairy: ["cheese"],
      plants: ["lettuce", "garlic"],
    },
    ingredients: [
      "2 heads romaine lettuce, chopped",
      "1 cup croutons",
      "50g Parmesan cheese, shaved",
      "3 tbsp mayonnaise",
      "1 tbsp Dijon mustard",
      "2 cloves garlic, minced",
      "2 tbsp lemon juice",
      "1 tsp Worcestershire sauce",
      "3 tbsp olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Whisk together mayonnaise, Dijon, garlic, lemon juice, Worcestershire, and olive oil to make the dressing.",
      "Season the dressing with salt and pepper to taste.",
      "Place chopped romaine in a large bowl.",
      "Pour dressing over the lettuce and toss to coat evenly.",
      "Top with croutons and shaved Parmesan. Serve immediately.",
    ],
    servings: 4,
    workTime: 15,
    cookTime: 0,
    totalTime: 15,
  },
  {
    id: "honey-garlic-salmon",
    title: "Honey Garlic Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format",
    keywords: {
      type: ["dinner"],
      how: ["bake"],
      meat: ["fish"],
      dairy: [],
      plants: ["garlic"],
    },
    ingredients: [
      "4 salmon fillets",
      "3 tbsp honey",
      "2 tbsp soy sauce",
      "3 cloves garlic, minced",
      "1 tbsp olive oil",
      "1 tbsp lemon juice",
      "1 tsp sesame seeds",
      "Green onions for garnish",
    ],
    instructions: [
      "Preheat oven to 200°C (400°F). Line a baking sheet with parchment paper.",
      "Mix honey, soy sauce, garlic, olive oil, and lemon juice in a small bowl.",
      "Place salmon fillets on the baking sheet and brush generously with the glaze.",
      "Bake for 12–15 minutes until salmon flakes easily with a fork.",
      "Sprinkle with sesame seeds and green onions before serving.",
    ],
    servings: 4,
    workTime: 10,
    cookTime: 15,
    totalTime: 20,
  },
  {
    id: "mushroom-risotto",
    title: "Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format",
    keywords: {
      type: ["dinner"],
      how: ["simmer"],
      meat: ["vegetarian"],
      dairy: ["butter", "cheese"],
      plants: ["mushroom", "rice", "onion"],
    },
    ingredients: [
      "300g arborio rice",
      "250g mixed mushrooms, sliced",
      "1 small onion, diced",
      "2 cloves garlic, minced",
      "120ml dry white wine",
      "1L warm vegetable stock",
      "2 tbsp butter",
      "50g Parmesan cheese, grated",
      "2 tbsp olive oil",
      "Fresh thyme",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Heat olive oil in a large pan. Sauté mushrooms until golden, about 5 minutes. Remove and set aside.",
      "In the same pan, cook onion and garlic until soft, about 3 minutes.",
      "Add arborio rice and stir for 1 minute until lightly toasted.",
      "Pour in the white wine and stir until absorbed.",
      "Add warm stock one ladle at a time, stirring frequently, until the rice is creamy and al dente (about 18 minutes).",
      "Stir in the mushrooms, butter, and Parmesan. Season with salt, pepper, and fresh thyme.",
    ],
    servings: 4,
    workTime: 10,
    cookTime: 30,
    totalTime: 35,
  },
  {
    id: "chicken-tacos",
    title: "Chicken Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format",
    keywords: {
      type: ["dinner"],
      how: ["grill", "fry"],
      meat: ["chicken"],
      dairy: ["sour cream"],
      plants: ["avocado", "onion", "tortilla"],
    },
    ingredients: [
      "500g chicken thighs",
      "1 tbsp chili powder",
      "1 tsp cumin",
      "1 tsp paprika",
      "8 small flour tortillas",
      "1 avocado, sliced",
      "1 cup pico de gallo",
      "Pickled red onions",
      "Fresh cilantro",
      "Lime wedges",
      "Sour cream for serving",
    ],
    instructions: [
      "Season chicken with chili powder, cumin, paprika, salt, and pepper.",
      "Grill or pan-fry chicken over medium-high heat for 6–7 minutes per side until cooked through.",
      "Let chicken rest for 5 minutes, then slice into strips.",
      "Warm tortillas in a dry pan or directly over a gas flame.",
      "Fill each tortilla with chicken, pico de gallo, avocado, and pickled onions.",
      "Top with cilantro, a squeeze of lime, and a dollop of sour cream.",
    ],
    servings: 4,
    workTime: 15,
    cookTime: 15,
    totalTime: 25,
  },
  {
    id: "butternut-squash-soup",
    title: "Butternut Squash Soup",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format",
    keywords: {
      type: ["dinner", "lunch"],
      how: ["roast", "simmer"],
      meat: ["vegetarian"],
      dairy: ["cream"],
      plants: ["squash", "onion", "garlic"],
    },
    ingredients: [
      "1 large butternut squash, peeled and cubed",
      "1 onion, diced",
      "2 cloves garlic",
      "2 tbsp olive oil",
      "500ml vegetable stock",
      "120ml heavy cream",
      "1 tsp ground cinnamon",
      "½ tsp ground nutmeg",
      "Salt and pepper to taste",
      "Toasted pumpkin seeds for garnish",
    ],
    instructions: [
      "Preheat oven to 200°C (400°F). Toss squash cubes with olive oil, salt, and pepper. Roast for 25 minutes until tender.",
      "In a large pot, sauté onion and garlic until soft.",
      "Add roasted squash and vegetable stock. Bring to a simmer.",
      "Blend until smooth using an immersion blender.",
      "Stir in cream, cinnamon, and nutmeg. Season to taste.",
      "Serve topped with toasted pumpkin seeds and a swirl of cream.",
    ],
    servings: 6,
    workTime: 15,
    cookTime: 35,
    totalTime: 40,
  },
  {
    id: "chocolate-lava-cake",
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format",
    keywords: {
      type: ["dessert"],
      how: ["bake"],
      meat: ["vegetarian"],
      dairy: ["butter", "eggs"],
      plants: ["flour", "chocolate"],
    },
    ingredients: [
      "200g dark chocolate, chopped",
      "100g unsalted butter",
      "3 eggs",
      "3 egg yolks",
      "50g sugar",
      "2 tbsp all-purpose flour",
      "Pinch of salt",
      "Butter and cocoa for ramekins",
      "Powdered sugar for dusting",
      "Vanilla ice cream for serving",
    ],
    instructions: [
      "Preheat oven to 220°C (425°F). Butter 4 ramekins and dust with cocoa powder.",
      "Melt chocolate and butter together in a double boiler or microwave. Stir until smooth.",
      "In a separate bowl, whisk eggs, egg yolks, and sugar until thick and pale.",
      "Fold the chocolate mixture into the egg mixture. Gently fold in flour and salt.",
      "Divide batter among the prepared ramekins.",
      "Bake for 12–14 minutes until the edges are firm but the center is still soft.",
      "Let cool for 1 minute, then invert onto plates. Dust with powdered sugar and serve with ice cream.",
    ],
    servings: 4,
    workTime: 15,
    cookTime: 14,
    totalTime: 25,
  },
  {
    id: "veggie-stir-fry",
    title: "Veggie Stir-Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format",
    keywords: {
      type: ["dinner"],
      how: ["stir-fry"],
      meat: ["vegan"],
      dairy: [],
      plants: ["bell pepper", "broccoli", "snap peas", "carrot", "rice"],
    },
    ingredients: [
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "1 cup broccoli florets",
      "1 cup snap peas",
      "2 carrots, julienned",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tbsp rice vinegar",
      "1 tbsp fresh ginger, grated",
      "2 cloves garlic, minced",
      "1 tbsp cornstarch mixed with 2 tbsp water",
      "Sesame seeds and green onions for garnish",
    ],
    instructions: [
      "Mix soy sauce, sesame oil, rice vinegar, ginger, and garlic in a small bowl.",
      "Heat a wok or large skillet over high heat with a splash of oil.",
      "Add carrots and broccoli first; stir-fry for 2 minutes.",
      "Add bell peppers and snap peas; stir-fry another 2 minutes.",
      "Pour the sauce over the vegetables and toss to coat.",
      "Add the cornstarch slurry and cook until the sauce thickens, about 1 minute.",
      "Serve over steamed rice, garnished with sesame seeds and green onions.",
    ],
    servings: 4,
    workTime: 15,
    cookTime: 10,
    totalTime: 20,
  },
];

export default recipes;

/** Collect all unique values for each keyword category across all recipes */
export function getAllFilterOptions(): Record<keyof RecipeKeywords, string[]> {
  const options: Record<keyof RecipeKeywords, Set<string>> = {
    type: new Set(),
    how: new Set(),
    meat: new Set(),
    dairy: new Set(),
    plants: new Set(),
  };
  for (const recipe of recipes) {
    for (const key of Object.keys(options) as (keyof RecipeKeywords)[]) {
      for (const val of recipe.keywords[key]) {
        options[key].add(val);
      }
    }
  }
  return {
    type: [...options.type].sort((a, b) => a.localeCompare(b)),
    how: [...options.how].sort((a, b) => a.localeCompare(b)),
    meat: [...options.meat].sort((a, b) => a.localeCompare(b)),
    dairy: [...options.dairy].sort((a, b) => a.localeCompare(b)),
    plants: [...options.plants].sort((a, b) => a.localeCompare(b)),
  };
}

/** Flatten a RecipeKeywords object into a single array of strings */
export function flattenKeywords(kw: RecipeKeywords): string[] {
  return [...kw.type, ...kw.how, ...kw.meat, ...kw.dairy, ...kw.plants];
}

