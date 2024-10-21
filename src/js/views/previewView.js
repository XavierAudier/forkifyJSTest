import View from "./View";
import icons from 'url:../../../src/img/icons.svg'

export default class PreviewView extends View {
    _parentElement = "";
    _errorMessage = "No bookmarks yets. Find a nice recipe and bookmark it!";
    _message = "";

    _generateMarkup(){
        const id = window.location.hash.slice(1)
        if (!this._data) return this.renderError()

        const markup = this._data.map(function (rec) {
            return `
            <li class="preview">
                <a class="preview__link ${(rec.id==id)?"preview__link--active":""}" href="#${rec.id}">
                    <figure class="preview__fig">
                        <img src="${rec.image}" alt="${rec.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${rec.title}</h4>
                        <p class="preview__publisher">${rec.publisher}</p>                        <div class="preview__user-generated">
                        </div>
                    </div>
                </a>
            </li>`
    }).join("")
        return markup
    }
    init(){
        this.addHandlerRender((function () {this.update(this._data)}.bind(this)))
    }
}

// export default new PreviewView()