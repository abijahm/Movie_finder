import { selectedActorSpan, searchSuggestion, movieCard} from './components';

describe("Testing components render correctly", () => {
  const actor = {
    id : "2389",
    name : "Sylvester Stallone"
  }

  const movie = {
    id: "7890",
    poster_path: "/jdjkcjnbahbbjbvbjh.jpg",
    title: "Transformers : Age of extintion",
    overview: "blah blah blah blah",
    genres_ids: [2,4],
    release_date: "2019-06-05", vote_average: 6.9
  }
   
  const genreDict = new Map()
  genreDict.set(2, "Action")
  genreDict.set(4,"Adventure")

  const {id, name} = actor

  test("Span element should have an id,innerText and svg as child", () => {
    const span = selectedActorSpan(id, name)

    expect(span).toBeDefined()
    expect(span.id).toBe(id)
    expect(span.textContent.trim()).toBe(name)
    expect(span.children.length).toBe(1)
  })

  test("Suggestions paragraph has id and actor name", () => {
    const p = searchSuggestion(id, name)

    expect(p).toBeDefined()
    expect(p.id).toBe(id)
    expect(p.innerText).toBe(name)
  })

  test("Movie card has the correct variables", () => {
    const card = movieCard(movie, genreDict)

    expect(card).toBeDefined()
    expect(card.id).toBe(movie.id)
    expect(card.children[0].src).toBe(`https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    expect(card.querySelector(".title").textContent).toBe(movie.title)
    expect(card.querySelector(".synopsis").textContent).toBe(movie.overview)
    expect(card.querySelector(".genre").textContent).toBe(movie.genres_ids.map(id => genreDict.get(id)).join("/"))
    expect(card.querySelector(".releasedate").textContent).toBe(movie.release_date)
    expect(card.querySelector(".votes").textContent).toBe(`${movie.vote_average}/10`)
  })

})
