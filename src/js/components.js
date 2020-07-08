
export const selectedActorSpan = (id,name) => {
  const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>`

  const spanHtml = `
  <span id=${id}>${name}${closeSvg}</span>`
  
  const fakediv = document.createElement("div")
  fakediv.innerHTML = spanHtml

  return fakediv.firstElementChild
}

export const searchSuggestion = (id, name) => {
  const suggestionParagraph = document.createElement("p")
  suggestionParagraph.id = id
  suggestionParagraph.innerText = name
  return suggestionParagraph
}

export const movieCard = (movie, genresDict) => {
  const cardHtml = `
    <article class="moviecard" id="${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movieinfo">
	<h2 class="title">${movie.title}</h2>
	<article class="overview">
	  <h3>Overview</h3>
	  <p class="synopsis" title="${movie.overview}">${movie.overview}</p>
	  <p>
	    Genre: <span class="genre">${movie.genres_ids.map(id => genresDict.get(id)).join("/")}</span>
	  </p>
	  <p>
	    Release: <span class="releasedate">${movie.release_date}</span>
	  </p>
	  <p class="ratings">
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
	  <span class="votes">${movie.vote_average}/10</span>
	  </p>
	</article>
      </div>
    </article>`

  const shadowDiv = document.createElement('div')
  shadowDiv.innerHTML = cardHtml

  return shadowDiv.firstElementChild
}
