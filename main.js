let app = document.querySelector('#app');
let user_input = document.querySelector("#search");
let get_movie = document.querySelector("#get_movie");
const movie_data = null;

async function getMovies(user_input){
  let movie = user_input.value;
  const URL = `http://www.omdbapi.com/?s=${movie}&page=1&apikey=f264c406`;
  const result= await fetch(`${URL}`);
  const data= await result.json();
  const movie_data = data.Search;
  console.log(movie_data)

  movie_data.forEach(item => {
    let {Poster, Title, Type, Year, imdbID, Genre}=item;

    app.innerHTML += `
    <div class="card">
      <h1>${Title} ${Genre}</h1>
      <button id="summary"></button>
    </div>
    `;
  })
  async function getDetails(event) {
    let id = event.target.id;
    const URL = `http://www.omdbapi.com/?plot=full&i=${id}&apikey=f264c406`;
    const details = await fetch(`${URL}`);
    const details_data = await details.json();
    console.log(details_data);
  }

  const buttons = document.getElementsByTagName('button')
  buttons.addEventListener('click', ()=> getDetails())
}



get_movie.addEventListener("click",()=> getMovies(user_input));