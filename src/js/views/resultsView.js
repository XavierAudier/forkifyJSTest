import View from "./View";
import icons from 'url:../../../src/img/icons.svg'
import PreviewView from './previewView.js'

class ResultsView extends PreviewView {
    _parentElement = document.querySelector(".results");
    _errorMessage = "No recipes found for your query. Please try again!";
    _message = "";
}

export default new ResultsView()