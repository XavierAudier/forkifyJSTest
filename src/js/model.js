import {apiUrl, RES_PER_PAGE} from "./config.js"
import {getJSON} from './helpers.js'

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: [],
};

export function getPaginationLimits () {
    return {
        previous: ((state.search.page > 1) && (state.search.results.length > 1)) ? state.search.page-1 : undefined,
        next: (state.search.results.length > state.search.page*state.search.resultsPerPage) ? state.search.page+1 : undefined
    }
}

export const loadRecipe = async function (recipeId) {
    try{
        const data = await getJSON(`${apiUrl}/${recipeId}`)

        const  {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.sourceUrl,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }

        state.recipe.bookmarked = (state.bookmarks.some(bookmark => bookmark.id == recipeId)) 
            
    } catch (err) {
        throw err;
    }
}

export const loadSearchResults = async function (query){
    try{
        state.search.query = query 
        const res = await fetch(`${apiUrl}?search=${query}`);
        const data = await res.json();        
        
        state.search.page = 1;   
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };})
    } catch (err) {
        throw err
    }
}

export function getSearchResultsPage (page = state.search.page) {
    state.search.page = page;
    const start = state.search.resultsPerPage*(page -1);
    const end = state.search.resultsPerPage*(page);
    return state.search.results.slice(start, end)
}

export function setServingSize(nbServings) {
  const ratio = nbServings / state.recipe.servings
  state.recipe.ingredients = state.recipe.ingredients.map(ing => {
    const newIng = {...ing};
    newIng.quantity = newIng.quantity * ratio
    return newIng
  })
  state.recipe.servings = state.recipe.servings * ratio
}

export function addBookmark (recipe) {
    state.bookmarks.push(recipe)

    if (recipe.id == state.recipe.id) {
        state.recipe.bookmarked = true
    }
    persistBookmarks();
}
export function removeBookmark (recipeId) {
    state.bookmarks.pop(state.bookmarks.find(rec => rec.id == recipeId))

    if (recipeId == state.recipe.id) {
        state.recipe.bookmarked = false
    }
    persistBookmarks();
}

function persistBookmarks (){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}
function loadBookmarks (){
    const storage = JSON.parse(localStorage.getItem('bookmarks'))
    state.bookmarks = storage?JSON.parse(localStorage.getItem('bookmarks')):[]
}

export function uploadRecipe (newRecipe){
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1].trim()!="")
      .map(ing => {
        const [quantity, unit, description] = ing[1].replaceAll(" ", "").split(",");
        return {quantity: quantity? +quantity : null, unit, description}
      })
      console.log(ingredients);
      return ingredients;
  }

loadBookmarks()