import View from "./View";
import icons from 'url:../../../src/img/icons.svg'

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)';
  
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super()
        this._parentElement = this._window;
        this._addHandlerShowWindow()
        this._addHandlerHideWindow()
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', (function (){
            this.toggleWindow();
        }).bind(this))
    }
    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', (function (){
            this.toggleWindow();
        }).bind(this))
    }
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
          e.preventDefault();
          console.log(this);
          const dataArr = [...new FormData(this.querySelector(".upload"))];
          const data = Object.fromEntries(dataArr);
          handler(data);
        });
        this._parentElement.addEventListener('submit', (() => this.toggleWindow()).bind(this));
    }
    _generateMarkup(){
        const markup = ""
        return markup
    }
}

export default new AddRecipeView()