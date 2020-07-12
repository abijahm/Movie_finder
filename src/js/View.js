import { selectedActorSpan, searchSuggestion, movieCard} from "./Components";

export default class View {
  #debounceTimer
  constructor(controller,debounceTime){
    this.controller = controller
    this.debounceTime = debounceTime
    this.selectedContainer = document.querySelector("#selected")
    this.suggestionsContainer = document.querySelector("#suggestions")
    this.movieContainer = document.querySelector("#moviecontainer")
    this.searchInput = document.querySelector("#searchinput")

    this.selectedContainer.addEventListener("click", (ev) => {
      let clickedElement = ev.target
      if(clickedElement.tagName === "svg"){
	let { id } = clickedElement.parentNode
	this.controller.handleRemoveSelected(parseInt(this._extractId(id)))
      }
    })

    document.addEventListener("keydown", (ev) => {
      //add scroll ability on suggestions
      const { key }  = ev
      if(this._suggestionsIsShown()){
	switch(key){
	  case "ArrowDown":
	    ev.preventDefault()
	    this._highlightNextSuggestion()
	    break
	  case "ArrowUp":
	    ev.preventDefault()
	    this._highlightPrevSuggestion()
	    break
	  case "Enter":
	    ev.preventDefault()
	    this._selectSuggestion(this._getHighlightedSuggestion()) 
	    break
	}
      } 
    })

    this.suggestionsContainer.addEventListener("click", (ev) => {
      const { tagName } = ev.target
      if(!(tagName === "P")) return
      this._selectSuggestion(ev.target)
    })

    this.searchInput.addEventListener("keydown", (ev) => {
      if(ev.key === "Backspace"){
	const content = this.searchInput.value
	const selectedCount = this.selectedContainer.children.length
	if(content.length == 0 && selectedCount > 0){
	  const id = this.selectedContainer.lastElementChild.id
	  this.controller.handleRemoveSelected(parseInt(this._extractId(id)))
	}
      }
    })

    this.searchInput.addEventListener("input", () => {
      const content = this.searchInput.value
      clearTimeout(this.#debounceTimer)
      this.#debounceTimer = setTimeout(() =>{
	if(content.length < 3) return
	this.controller.handleSuggest(content)
      },this.debounceTime)
    })
  }

  _extractId(idstr){
    return idstr.split("-")[1]
  }
  _clearSearchField(){
    this.searchInput.value = ""
  }

  _suggestionsIsShown() {
    return !this.suggestionsContainer.classList.contains("hidden")
  }

  _highlightNextSuggestion(){
    const currentElement = this.suggestionsContainer.querySelector(".highlighted")
    let nextElement = currentElement.nextElementSibling
    currentElement.classList.remove("highlighted")
    if(!nextElement){
      nextElement = this.suggestionsContainer.firstElementChild
    }
    nextElement.classList.add("highlighted")
  }
  
  _highlightPrevSuggestion(){
    const currentElement = this.suggestionsContainer.querySelector(".highlighted")
    let prevElement = currentElement.previousElementSibling
    currentElement.classList.remove("highlighted")
    if(!prevElement){
      prevElement = this.suggestionsContainer.lastElementChild
    }
    prevElement.classList.add("highlighted")
  }

  _getHighlightedSuggestion(){
    return this.suggestionsContainer.querySelector(".highlighted")
  }

  _showSuggestions() {
    this.suggestionsContainer.innerHTML = ""
    if(!this.suggestionsContainer.classList.contains("hidden")) return
    this.suggestionsContainer.classList.remove("hidden")
  }

  _hideSuggestions() {
    if(this.suggestionsContainer.classList.contains("hidden")) return
    this.suggestionsContainer.innerHTML = ""
    this.suggestionsContainer.classList.add("hidden")
  }

  _selectSuggestion(selected){
    const { id, textContent } = selected
    this.controller.handleAddSelected(this._extractId(id), textContent)
    this._clearSearchField()
    this._hideSuggestions()
  }

  _debounceEvent(callback,timeout) {
    let timer
    return function(){
      let that = this
      let args = arguments
      clearTimeout(timer)
      timer = setTimeout(()=>{
	callback.apply(that,args)
      },timeout)
    }
  }

  removeSelectedActor(id){
    this.selectedContainer.querySelector(`#id-${id}`).remove()
  }

  renderSelected(id, actorName){
    this.selectedContainer.appendChild(selectedActorSpan(id,actorName))
  }

  renderSuggestions(suggestions){
    if(!suggestions.length) return
    this._showSuggestions()
    suggestions.forEach(suggestion => {
      let { id, name } = suggestion
      this.suggestionsContainer.appendChild(searchSuggestion(id,name))
    })
    this.suggestionsContainer.firstElementChild.classList.add("highlighted")
  }

  renderMovies(movies){
    this.movieContainer.innerHTML = ""
    movies.forEach(movie => {
      this.movieContainer.appendChild(movieCard(movie))
    })
  }
}
