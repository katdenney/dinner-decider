import {
    searchMeals,
    getRandomMeal,
    getCategories,
    getRegions,
    getMealsByCategory,
    getMealsByRegion
} from "./meal-api.js";

/*elements*/
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#meal-search");
const randomButton = document.querySelector("#random-button");
const recipeContainer = document.querySelector("#recipe-container");
const statusMessage = document.querySelector("#status-message");
const currentYear = document.querySelector("#current-year");
const categoryFilter = document.querySelector("#category-filter");
const regionFilter = document.querySelector("#region-filter");
const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");

/*get year*/
currentYear.textContent = new Date().getFullYear();
/*display meals*/
function displayMeals(meals) {
    recipeContainer.innerHTML = "";

    if (meals.length === 0) {
        statusMessage.textContent = "No recipes found.";
        return;
    }

    statusMessage.textContent = "";

    meals.forEach((meal) => {
        const card = document.createElement("article");
        card.classList.add("recipe-card");

        const image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.classList.add("recipe-card-content");

        const title = document.createElement("h3");
        title.textContent = meal.strMeal;

        const category = document.createElement("p");
        category.textContent = `Category: ${meal.strCategory ?? "Unknown"}`;

        const region = document.createElement("p");
        region.textContent = `Region: ${meal.strArea ?? "Unknown"}`;

        content.append(title, category, region);
        card.append(image, content);
        recipeContainer.append(card);
    });
}
/*load filters*/
async function loadFilters() {
    try {
        const categories = await getCategories();
        const regions = await getRegions();

        // Categories
        categories.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.strCategory;
            option.textContent = item.strCategory;
            categoryFilter.append(option);
        });

        // Regions
        regions.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.strArea;
            option.textContent = item.strArea;
            regionFilter.append(option);
        });
    } catch {
        statusMessage.textContent = "Filters could not be loaded.";
    }
}
/*events*/
/*event 1 submit*/
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        return;
    }

    statusMessage.textContent = "Finding recipes...";

    try {
        const meals = await searchMeals(searchTerm);
        displayMeals(meals);
    } catch {
        statusMessage.textContent =
            "Sorry, recipes could not be loaded.";
    }
});
/*event 2 click*/
randomButton.addEventListener("click", async () => {
    statusMessage.textContent = "Choosing your dinner...";

    try {
        const meal = await getRandomMeal();

        if (meal) {
            displayMeals([meal]);
        }
    } catch {
        statusMessage.textContent =
            "Sorry! you might be hungry, a random dinner could not be loaded!";
    }
});
/*event 3 category*/
categoryFilter.addEventListener("change", async () => {
    const category = categoryFilter.value;

    if (!category) {
        return;
    }

    statusMessage.textContent = "Finding recipes...";

    try {
        const meals = await getMealsByCategory(category);
        displayMeals(meals);
    } catch {
        statusMessage.textContent =
            "Category recipes could not be loaded.";
    }
});

/*event 4 region*/
regionFilter.addEventListener("change", async () => {
    const region = regionFilter.value;

    if (!region) {
        return;
    }

    statusMessage.textContent = "Finding recipes...";

    try {
        const meals = await getMealsByRegion(region);
        displayMeals(meals);
    } catch {
        statusMessage.textContent =
            "Region recipes could not be loaded.";
    }
});
/*navigation event 5*/
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const expanded =
        menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!expanded));
});

/*initialize*/
loadFilters();

