
export default class Controller {
  view
  constructor(model){
    this.model = model
  }

  async handleSuggest(searchString){
    let { results } = await this.model.search("person",searchString)
    this.view.renderSuggestions(results.slice(0,5))
  }

  async handleAddSelected(id, actorName) {
    let credits = await this.model.getCredits(id)
    this.model.addSelected(credits)
    this.view.renderSelected(id, actorName)
    this.handleLoadMovies()
  }

  handleRemoveSelected(id){
    this.model.removeSelected(id)
    this.view.removeSelectedActor(id)
    this.handleLoadMovies()
  }

  handleLoadMovies(){
    let movies = this.model.getCoStaredMovies()
    this.view.renderMovies(movies)
  }
}
