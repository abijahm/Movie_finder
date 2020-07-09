export default class MoviesModel {
  #selectedActors = new Map()
  constructor(apiKey){
    this.apiKey = apiKey;
  }

  async search(kind = "person", searchStr){
    let response = await fetch(`https://api.themoviedb.org/3/search/${kind}?api_key=${this.apiKey}&query=${searchStr}`,{method: "GET"})
     return response.json()
  }

  async getCredits(actorId){
    let response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${this.apiKey}`, {method: "GET"})
    return response.json()
  }

  addSelected(actorCredit){
    let {id, cast, crew} = actorCredit
    this.#selectedActors.set(id,{cast: cast, crew: crew})
  }

  getSelected(actorId){
    return this.#selectedActors.get(actorId)
  }

  removeSelected(actorId){
    this.#selectedActors.delete(actorId)
  }

  getCoStaredMovies(){
    let coStaredMovies = []  
    let size = this.#selectedActors.size
    let index = 0

    for(let [key, val] of this.#selectedActors){ 
      let movies = val.cast
      if(size === 1 || index === 0) coStaredMovies = movies
      if(!coStaredMovies.length) break

      let keys = coStaredMovies.map(movie => movie.id)
      coStaredMovies = movies.filter(movie => {
	return keys.includes(movie.id)
      }) 
      index++
    }
    return coStaredMovies
  }

}
