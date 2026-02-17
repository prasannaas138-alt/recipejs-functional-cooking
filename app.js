// ============================================
// RECIPE DATA
// ============================================

const recipes = [
{
id: 1,
title: "Classic Spaghetti Carbonara",
time: 25,
difficulty: "easy",
description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
category: "pasta"
},
{
id: 2,
title: "Chicken Tikka Masala",
time: 45,
difficulty: "medium",
description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
category: "curry"
},
{
id: 3,
title: "Homemade Croissants",
time: 180,
difficulty: "hard",
description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
category: "baking"
},
{
id: 4,
title: "Greek Salad",
time: 15,
difficulty: "easy",
description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
category: "salad"
},
{
id: 5,
title: "Beef Wellington",
time: 120,
difficulty: "hard",
description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
category: "meat"
},
{
id: 6,
title: "Vegetable Stir Fry",
time: 20,
difficulty: "easy",
description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
category: "vegetarian"
},
{
id: 7,
title: "Pad Thai",
time: 30,
difficulty: "medium",
description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
category: "noodles"
},
{
id: 8,
title: "Margherita Pizza",
time: 60,
difficulty: "medium",
description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
category: "pizza"
}
];


// ============================================
// STATE MANAGEMENT
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

        case "all":
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

        case "none":
        default:
            return recipesArray;
    }
};


// ============================================
// CREATE CARD (UNCHANGED)
// ============================================

const createRecipeCard = (recipe) => {
return `
<div class="recipe-card">
<h3>${recipe.title}</h3>
<div class="recipe-meta">
<span>${recipe.time} mins</span>
<span class="difficulty ${recipe.difficulty}">
${recipe.difficulty}
</span>
</div>
<p>${recipe.description}</p>
</div>
`;
};


// ============================================
// RENDER FUNCTION (UNCHANGED)
// ============================================

const renderRecipes = (recipesArray) => {
    const html = recipesArray
        .map(createRecipeCard)
        .join('');

    recipeContainer.innerHTML = html;
};


// ============================================
// MAIN UPDATE FUNCTION
// ============================================

const updateDisplay = () => {

    let updatedRecipes = recipes;

    updatedRecipes = applyFilter(updatedRecipes, currentFilter);
    updatedRecipes = applySort(updatedRecipes, currentSort);

    renderRecipes(updatedRecipes);
};


// ============================================
// UPDATE ACTIVE BUTTON UI
// ============================================

const updateActiveButtons = () => {

    filterButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("active");
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.sort === currentSort) {
            btn.classList.add("active");
        }
    });
};


// ============================================
// EVENT HANDLERS
// ============================================

const handleFilterClick = (event) => {
    currentFilter = event.target.dataset.filter;
    updateActiveButtons();
    updateDisplay();
};

const handleSortClick = (event) => {
    currentSort = event.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
};


// ============================================
// SETUP EVENT LISTENERS
// ============================================

const setupEventListeners = () => {

    filterButtons.forEach(btn => {
        btn.addEventListener("click", handleFilterClick);
    });

    sortButtons.forEach(btn => {
        btn.addEventListener("click", handleSortClick);
    });
};


// ============================================
// INITIALIZATION (REPLACED PART 1 CODE)
// ============================================

setupEventListeners();
updateDisplay();
