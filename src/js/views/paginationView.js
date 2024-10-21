import View from "./View";
import icons from 'url:../../../src/img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination")
    _errorMessage = "No recipes found for your query. Please try again!"
    _message = ""

    addHandlerPagination(handler){
        this._parentElement.addEventListener('click', function (e) {
                const btn = e.target.closest('.btn--inline')
                if (!btn) return;
                handler(+btn.dataset.goto)
            })
    }

    _generateMarkup(){
        const markup = `
        ${isFinite(this._data.previous)
            ? ` <button class="btn--inline pagination__btn--prev" data-goto="${this._data.previous}">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.previous}</span>
                </button>
                `
            : ""
        }
        ${isFinite(this._data.next)
            ? ` <button class="btn--inline pagination__btn--next" data-goto="${this._data.next}">
                    <span>Page ${this._data.next}</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`
            : ""
        }`
        return markup
    }
}

export default new PaginationView()