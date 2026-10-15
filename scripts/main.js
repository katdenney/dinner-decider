import {
    searchMeals,
    getRandomMeal
} from "./meal-api.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#meal-search");
const randomButton = document.querySelector("#random-button");
const recipeContainer = document.querySelector("#recipe-container");
const statusMessage = document.querySelector("#status-message");
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();
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

