import View from "./View";

class SearchView extends View {
    _parentEl = document.querySelector(".search")

    getQuery(){
        const query = this._parentEl.querySelector(".search__field").value;
        this.clearInput();
        return query;
    }

    addHandlerSearch(handler){
        this._parentEl.addEventListener('submit', function (e){
            e.preventDefault();
            return handler(e);
        })
    }

    clearInput(){
        this._parentEl.querySelector(".search__field").value = "";
    }
}

export default new SearchView()