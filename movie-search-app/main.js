const API_KEY = '37a7de13';
const API = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;

const movieName = document.getElementById('movie-name');
const searchBtn = document.getElementById('search-btn');
const result = document.getElementById('result');
const searchForm = document.getElementById('search-form');
const customInput = document.querySelector('.search-form__input');

const defaultMovie = 'Avatar: The Way of Water';

async function getMovie(movieName) {
  const url = `${API}&t=${movieName || defaultMovie}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === 'True') {
    const genres = data.Genre.split(',').map((genre) => genre.trim());
    const html = `
      <article class="movie">
        <div class="movie__img">
        <img src="${data.Poster}" alt="movie poster" class="movie__poster">
        </div>
        <div class="movie__info">
          <h2 class="movie__title">${data.Title}</h2>
          <ul class="movie__genres">
            ${genres.map((genre) => `<li  class="movie__genres__item">${genre}</li>`).join('')}
          </ul>
          <p class="movie__plot">${data.Plot}</p>
          <ul class="movie__details">
            <li class="movie__details__item"><span>Director:</span> ${data.Director}</li>
            <li class="movie__details__item"><span>Writers:</span> ${data.Writer}</li>
            <li class="movie__details__item"><span>Stars:</span> ${data.Actors}</li>
            <li class="movie__details__item">
            <span>Rating:</span> ${data.imdbRating}/10
            <small>(${data.imdbVotes} votes) </small>
            </li>
          </ul>
        </div>
      </article>
    `;

    result.innerHTML = html;
  } else {
    result.innerHTML = `<h3 class="error">Movie not found</h3>`;
  }
}
// On load get default movie
getMovie();
function onSubmit(e) {
  const movieName = e.target[0].value.toLowerCase().trim();
  e.preventDefault();
  if (!movieName) {
    e.target[0].setCustomValidity('Movie name is required');
    e.target[0].reportValidity();
    return;
  }
  e.target[0].setCustomValidity('');
  getMovie(movieName);
  customInput.style.color = '#97A3B6';
  e.target.reset();
}
// On Submit get requested movie
searchForm.addEventListener('submit', onSubmit);

// Add event listener to search button
searchBtn.addEventListener('click', () => {
  searchForm.dispatchEvent(new Event('submit'));
});

customInput.addEventListener('click', (e) => {
  const input = e.target.querySelector('input');
  input.focus();
  customInput.style.color = '#ffffff';
});
