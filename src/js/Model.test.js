import Model from "./Model"

const searchResults = {
    "page":1,
    "result": [
      {
	"id": 51329,
	"known_for": [],
	"name": "Bradley Cooper",
	"popularity": 6.43
      },
      {
	"id": 154689,
	"known_for": [],
	"name": "Bradley James",
	"popularity": 2.67
      }
    ]
}

describe("Test apps Model",() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(searchResults)
  }))

  const apiKey = "ghgh34"
  const moviesModel = new Model(apiKey)
  
  it("Should return actors", async () => { 
    let results = await moviesModel.search("person", "Bradley") 
    let calledUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=Bradley`

    expect(results.result).toBeDefined()
    expect(results.result.length).toBe(2)
    expect(global.fetch).toHaveBeenCalledWith(calledUrl ,{method: "GET"})
  })

  it("Should be called correctly and return actors credits", async () => {
    const actorCredits = {
      id: 51329,
      cast: [],
      crew: []
    }

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(actorCredits)
    }))

    const actorId = 51329
    let credits = await moviesModel.getCredits(actorId)
    let calledUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`

    expect(global.fetch).toHaveBeenCalledWith(calledUrl, {method: "GET"})
    expect(credits.id).toBe(actorCredits.id)
  })

   describe("Selected Operations", () => {
     let actors = [
       {
	 id: 51329,
	 cast: [
	   {
	     id: 3000,
	     title: "Transformers",
	     vote_average: 6.5
	   },
	   {
	     id: 4000,
	     title: "Terminator",
	     vote_average: 6.5
	   },
	   {
	     id: 5000,
	     title: "Transporter",
	     vote_average: 6.5
	   }
	 ]
       },
       {
	 id: 51328,
	 cast: [
	   {
	     id: 3000,
	     title: "Transformers",
	     vote_average: 6.5
	   },
	   {
	     id: 6000,
	     title: "Tete a tete",
	     vote_average: 6.5
	   },
	   {
	     id: 8000,
	     title: "Riff raff",
	     vote_average: 6.5
	   }
	 ]
       },
       {
	 id: 51327,
	 cast: [
	   {
	     id: 3001,
	     title: "Malooned!",
	     vote_average: 6.5
	   },
	   {
	     id: 4001,
	     title: "Nairobi half life",
	     vote_average: 6.5
	   },
	   {
	     id: 5001,
	     title: "Debt collector",
	     vote_average: 6.5
	   }
	 ]
       }
     ]

     it("Should add, select and delete actor from selected",() => {
       moviesModel.addSelected(actors[0])
       let {cast} = moviesModel.getSelected(actors[0].id)

       expect(cast).toBeDefined()
       expect(cast.length).toBe(actors[0].cast.length)

       moviesModel.removeSelected(actors[0].id)

       expect(moviesModel.getSelected(actors[0].id)).toBeUndefined()
     })

     it("Should return Costared Movies Correctly", () => {
       moviesModel.addSelected(actors[0])
       let costared = moviesModel.getCoStaredMovies()
       expect(costared.length).toBe(3)
     
       moviesModel.addSelected(actors[1])
       costared = moviesModel.getCoStaredMovies()
       expect(costared.length).toBe(1)
      
       moviesModel.addSelected(actors[2])
       costared = moviesModel.getCoStaredMovies()
       expect(costared.length).toBe(0) 
     })
   })
})
