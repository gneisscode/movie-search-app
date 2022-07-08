const movieSearchBox = document.querySelector("#movie-search-box");
const searchList = document.querySelector("#search-list");
const resultGrid = document.querySelector("#result-grid");

// load the movies from the API
async function loadMovies(searchTerm){
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=f264c406`;
    const result = await fetch(URL);
    const data = await result.json();
    console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list')
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for(let i=0; i<movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('search-list-item');
        
        if(movies[i].Poster != "N/A") {
            moviePoster = movies[i].Poster;
        } else {
            moviePoster = "image_not_found.png"
        }

        movieListItem.innerHTML = `
            <div class="search-item-thumbnail">
                <img src="${moviePoster}">
            </div>
            <div class="search-item-info">
                <h3>${movies[i].Title}</h3>
                <p>${movies[i].Year}</p>
            </div>
        `;
        searchList.append(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie => {
        movie.addEventListener("click", async () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=f264c406`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    let {Poster,Title,Year,Rated,Released,Genre,Writer,Actors,Plot,Language,Awards}=details
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${(Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${Year}</li>
                <li class="rated">Rated: ${Rated}</li>
                <li class="released">Released: ${Released}</li>
            </ul>
            <p class="genre"><b>Genre: ${Genre}</b></p>
            <p class="writer"><b>Writer: ${Writer}</b></p>
            <p class="actors"><b>Actor: ${Actors}</b></p>
            <p class="plot"><b>Plot: ${Plot}</b></p>
            <p class="language"><b>Language: ${Language}</b></p>
            <p class="awards"><b>Awards: ${Awards}</b></p>
        </div>
    `;
}

window.addEventListener('click', event => {
    if(event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
})
