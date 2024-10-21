import * as model from './model.js'
import recipeView from './views/recipeView.js'
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import bookmarksView from './views/bookmarksView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept()
}


async function showRecipe (){
  try{
    const id = window.location.hash.slice(1)
    if (!id) throw new Error(`Recipe ${id} could not be loaded !`);
    
    recipeView.renderSpinner();

    try{const _ = await timeout(1)} catch {}
    // 1) Load Recipe

    await model.loadRecipe(id) 


    // 2) rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (err) {
      recipeView.renderError();
  }
}

async function controlSearchResults (query) {
  try{
    resultsView.renderSpinner()

    const query = searchView.getQuery();
    if (!query) return;
    
    await model.loadSearchResults(query);
    
    // 2) rendering recipe
    resultsView.render(model.getSearchResultsPage())
    paginationView.render(model.getPaginationLimits())
  } catch (err) {
      resultsView.renderError();
  }

}

function controlPagination(page){
  resultsView.render(model.getSearchResultsPage(page))
  paginationView.render(model.getPaginationLimits())
  controlServings (page);
}

function controlServings (nbServings){
  if (!nbServings) return;
  model.setServingSize(nbServings);
  recipeView.update(model.state.recipe)
}

function controlAddBookmark(desiredValue){
  desiredValue
    ?model.addBookmark(model.state.recipe)
    :model.removeBookmark(model.state.recipe.id)
  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

function controlAddRecipe(newRecipe){
  model.uploadRecipe(newRecipe);
}

(function init(){
  recipeView.addHandlerRender(showRecipe)
  recipeView.addHandlerServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerPagination(controlPagination)
  resultsView.init()
  recipeView.addHandlerBookmark(controlAddBookmark)
  bookmarksView.init()
  bookmarksView.addHandlerRender(e => bookmarksView.render(model.state.bookmarks))
  addRecipeView.addHandlerUpload(controlAddRecipe)
})();
