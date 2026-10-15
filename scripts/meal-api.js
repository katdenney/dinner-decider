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