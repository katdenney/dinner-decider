const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
/*meals by name*/
export async function searchMeals(searchTerm) {
    const response = await fetch(
        `${BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
    );
    if (!response.ok) {
        throw new Error("Unable to retrieve recipes.");
    }
    /* JSON to JS object*/
    const data = await response.json();
    /* return meal or empty array*/
    return data.meals ?? [];
}
/* random meal*/ 
export async function getRandomMeal() {
    /* import */
    const response = await fetch(`${BASE_URL}/random.php`);

    if (!response.ok) {
        throw new Error("Unable to retrieve a random recipe.");
    }
    /* JSON to JS object*/
    const data = await response.json();
    

    return data.meals?.[0] ?? null;
}
/*Meal Categories*/
export async function getCategories() {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);

    if (!response.ok) {
        throw new Error("Unable to retrieve categories.");
    }

    // Parse
    const data = await response.json();

    return data.meals ?? [];
}

/*Meal Regions*/
export async function getRegions() {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);

    if (!response.ok) {
        throw new Error("Unable to retrieve regions.");
    }

    // Parse
    const data = await response.json();

    return data.meals ?? [];
}

/*Meal Categories*/
export async function getMealsByCategory(category) {
    const response = await fetch(
        `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve category.");
    }

    // Parse
    const data = await response.json();

    return data.meals ?? [];
}

/*Meal Region*/
export async function getMealsByRegion(region) {
    const response = await fetch(
        `${BASE_URL}/filter.php?a=${encodeURIComponent(region)}`
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve region.");
    }

    /*Parse*/
    const data = await response.json();

    return data.meals ?? [];
}
/*ingredient*/
export async function getMealsByIngredient(ingredient) {
    const response = await fetch(
        `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve ingredient recipes.");
    }

    const data = await response.json();

    return data.meals ?? [];
}