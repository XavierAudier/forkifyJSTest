import View from "./View";
import icons from 'url:../../../src/img/icons.svg'
import PreviewView from './previewView.js'

class BookmarksView extends PreviewView
 {
    _parentElement = document.querySelector(".bookmarks__list");
    _errorMessage = "No bookmarks yets. Find a nice recipe and bookmark it!";
    _message = "";

}

export default new BookmarksView()