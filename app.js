// ============================================
// RECIPE APP (IIFE MODULE)
// ============================================

const RecipeApp = (function () {

    // ============================================
    // RECIPE DATA (UPDATED WITH INGREDIENTS + STEPS)
    // ============================================

const recipes = [
{
id: 1,
title: "Classic Spaghetti Carbonara",
time: 25,
difficulty: "easy",
description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
category: "pasta",
ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
steps: [
    "Boil water and cook spaghetti.",
    {
        title: "Prepare Sauce",
        substeps: [
            "Whisk eggs and parmesan.",
            "Cook pancetta until crispy."
        ]
    },
    "Mix pasta with sauce and pancetta."
]
},
{
id: 2,
title: "Chicken Tikka Masala",
time: 45,
difficulty: "medium",
description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
category: "curry",
ingredients: ["Chicken", "Yogurt", "Tomato Sauce", "Spices", "Cream"],
steps: [
    {
        title: "Marinate Chicken",
        substeps: [
            "Mix yogurt and spices.",
            "Coat chicken and rest 30 minutes."
        ]
    },
    "Cook chicken.",
    "Prepare sauce and combine."
]
},
{
id: 3,
title: "Homemade Croissants",
time: 180,
difficulty: "hard",
description: "Buttery, flaky French pastries that require patience.",
category: "baking",
ingredients: ["Flour", "Butter", "Yeast", "Milk", "Sugar"],
steps: [
    {
        title: "Prepare Dough",
        substeps: [
            "Mix flour and yeast.",
            "Add milk and knead."
        ]
    },
    {
        title: "Layer Butter",
        substeps: [
            "Roll dough.",
            "Fold butter inside.",
            "Repeat folding process."
        ]
    },
    "Bake until golden brown."
]
},
{
id: 4,
title: "Greek Salad",
time: 15,
difficulty: "easy",
description: "Fresh vegetables with feta cheese and olives.",
category: "salad",
ingredients: ["Tomatoes", "Cucumber", "Feta", "Olives", "Olive Oil"],
steps: [
    "Chop vegetables.",
    "Mix in bowl.",
    "Add olive oil and toss."
]
},
{
id: 5,
title: "Beef Wellington",
time: 120,
difficulty: "hard",
description: "Tender beef fillet wrapped in puff pastry.",
category: "meat",
ingredients: ["Beef Fillet", "Mushrooms", "Puff Pastry", "Eggs", "Mustard"],
steps: [
    "Season and sear beef.",
    {
        title: "Prepare Mushroom Duxelles",
        substeps: [
            "Chop mushrooms.",
            "Cook until moisture evaporates."
        ]
    },
    "Wrap beef in pastry.",
    "Bake until golden."
]
},
{
id: 6,
title: "Vegetable Stir Fry",
time: 20,
difficulty: "easy",
description: "Mixed vegetables cooked in savory sauce.",
category: "vegetarian",
ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Garlic"],
steps: [
    "Chop vegetables.",
    "Heat oil in pan.",
    "Stir fry vegetables.",
    "Add sauce and cook 5 minutes."
]
},
{
id: 7,
title: "Pad Thai",
time: 30,
difficulty: "medium",
description: "Thai rice noodles with shrimp and peanuts.",
category: "noodles",
ingredients: ["Rice Noodles", "Shrimp", "Eggs", "Peanuts", "Tamarind Sauce"],
steps: [
    "Soak noodles.",
    {
        title: "Cook Shrimp",
        substeps: [
            "Heat oil.",
            "Cook shrimp until pink."
        ]
    },
    "Add noodles and sauce.",
    "Mix and serve."
]
},
{
id: 8,
title: "Margherita Pizza",
time: 60,
difficulty: "medium",
description: "Classic pizza with mozzarella and basil.",
category: "pizza",
ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Basil"],
steps: [
    "Prepare dough.",
    "Spread tomato sauce.",
    "Add mozzarella.",
    "Bake in oven.",
    "Garnish with basil."
]
}
];

    // ============================================
    // STATE
    // ============================================

    let currentFilter = "all";
    let currentSort = "none";

    // ============================================
    // DOM REFERENCES
    // ============================================

    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortButtons = document.querySelectorAll(".sort-btn");

    // ============================================
    // FILTER FUNCTION
    // ============================================

    const applyFilter = (recipesArray, filterType) => {
        switch (filterType) {
            case "easy":
                return recipesArray.filter(r => r.difficulty === "easy");
            case "medium":
                return recipesArray.filter(r => r.difficulty === "medium");
            case "hard":
                return recipesArray.filter(r => r.difficulty === "hard");
            case "quick":
                return recipesArray.filter(r => r.time <= 30);
            default:
                return recipesArray;
        }
    };

    // ============================================
    // SORT FUNCTION
    // ============================================

    const applySort = (recipesArray, sortType) => {
        switch (sortType) {
            case "name":
                return [...recipesArray].sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            case "time":
                return [...recipesArray].sort((a, b) =>
                    a.time - b.time
                );
            default:
                return recipesArray;
        }
    };

    // ============================================
    // RECURSIVE STEP RENDERING
    // ============================================

    const renderSteps = (steps) => {
        const ul = document.createElement("ul");

        steps.forEach(step => {
            const li = document.createElement("li");

            if (typeof step === "string") {
                li.textContent = step;
            } else {
                li.textContent = step.title;
                if (step.substeps) {
                    li.appendChild(renderSteps(step.substeps));
                }
            }

            ul.appendChild(li);
        });

        return ul;
    };

    // ============================================
    // CREATE CARD (UPDATED)
    // ============================================

    const createRecipeCard = (recipe) => {
        return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>${recipe.time} mins</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>

            <button class="toggle-steps">Show Steps</button>
            <button class="toggle-ingredients">Show Ingredients</button>

            <div class="steps hidden"></div>
            <div class="ingredients hidden"></div>
        </div>
        `;
    };

    // ============================================
    // RENDER
    // ============================================

    const renderRecipes = (recipesArray) => {
        recipeContainer.innerHTML =
            recipesArray.map(createRecipeCard).join('');
    };

    // ============================================
    // UPDATE DISPLAY
    // ============================================

    const updateDisplay = () => {
        let updated = applyFilter(recipes, currentFilter);
        updated = applySort(updated, currentSort);
        renderRecipes(updated);
    };

    // ============================================
    // EVENT DELEGATION (NEW)
    // ============================================

    const handleCardClick = (event) => {

        const card = event.target.closest(".recipe-card");
        if (!card) return;

        const recipeId = parseInt(card.dataset.id);
        const recipe = recipes.find(r => r.id === recipeId);

        // Toggle Steps
        if (event.target.classList.contains("toggle-steps")) {

            const stepsDiv = card.querySelector(".steps");

            if (stepsDiv.classList.contains("hidden")) {
                stepsDiv.innerHTML = "";
                stepsDiv.appendChild(renderSteps(recipe.steps));
                stepsDiv.classList.remove("hidden");
                event.target.textContent = "Hide Steps";
            } else {
                stepsDiv.classList.add("hidden");
                event.target.textContent = "Show Steps";
            }
        }

        // Toggle Ingredients
        if (event.target.classList.contains("toggle-ingredients")) {

            const ingDiv = card.querySelector(".ingredients");

            if (ingDiv.classList.contains("hidden")) {
                ingDiv.innerHTML =
                    "<ul>" +
                    recipe.ingredients.map(i => `<li>${i}</li>`).join("") +
                    "</ul>";
                ingDiv.classList.remove("hidden");
                event.target.textContent = "Hide Ingredients";
            } else {
                ingDiv.classList.add("hidden");
                event.target.textContent = "Show Ingredients";
            }
        }
    };

    // ============================================
    // BUTTON HANDLERS
    // ============================================

    const handleFilterClick = (event) => {
        currentFilter = event.target.dataset.filter;
        updateDisplay();
    };

    const handleSortClick = (event) => {
        currentSort = event.target.dataset.sort;
        updateDisplay();
    };

    // ============================================
    // INIT
    // ============================================

    const init = () => {

        filterButtons.forEach(btn =>
            btn.addEventListener("click", handleFilterClick)
        );

        sortButtons.forEach(btn =>
            btn.addEventListener("click", handleSortClick)
        );

        recipeContainer.addEventListener("click", handleCardClick);

        updateDisplay();
    };

    return { init };

})();


// START APP
RecipeApp.init();
