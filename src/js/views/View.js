import icons from 'url:../../../src/img/icons.svg'
const fracty = require('fracty');


export default class View {
    _parentElement;
    _errorMessage = "No recipes found for your query. Please try again!"
    _message = ""
    _data;

    _generateMarkup(){return "";}

    update(data){
        // if (!data || (Array.isArray(data) && data.length==0)) throw new Error(this._errorMessage)
        this._data = data;
        const newMarkup = this._generateMarkup()

        const newDOM = document.createRange().createContextualFragment(newMarkup)
        const newElement = Array.from(newDOM.querySelectorAll("*"))
        const curElement = Array.from(this._parentElement.querySelectorAll("*"))
        newElement.forEach((newEl, i) => {
            const curEl = curElement[i];
            if (!newEl.isEqualNode(curEl) && newEl?.firstChild?.nodeValue.trim() !==""){
                curEl.textContent = newEl.textContent
            }
            if (!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                    )
            }
        })
        
    }

    render(data){
        if (!data || (Array.isArray(data) && data.length==0)) throw new Error(this._errorMessage)

        this._data = data;
        const markup = this._generateMarkup()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
        
    _clear(){
        this._parentElement.innerHTML = ""
    }
    renderSpinner(){
        const markup = 
            `<div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
            </div>`
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }

    renderError(message = this._errorMessage){
        const markup = 
        `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
          this._clear()
          this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._message){
        const markup = 
        `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
          this._clear()
          this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    
}