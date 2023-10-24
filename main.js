let searchBtn = document.getElementById("searchButton");
let favBtn = document.getElementById("favBtn");

searchBtn.addEventListener("click", getFilm);

async function getFilm() {
  let searchInput = document.getElementById("searchInput").value;
  let img = document.querySelector(".img");
  let h2 = document.querySelector(".title");
  let type = document.querySelector(".type");
  let year = document.querySelector(".year");
  let runTime = document.querySelector(".runTime");
  let genre = document.querySelector(".genre");
  let director = document.querySelector(".director");

  try {
    let url = `https://www.omdbapi.com/?t=${searchInput}&i=tt3896198&apikey=83199631`;
    let response = await fetch(url);
    let data = await response.json();

    img.src = data.Poster;
    h2.innerHTML = data.Title;
    type.innerHTML = data.Type;
    year.innerHTML = data.Year;
    runTime.innerHTML = data.Runtime;
    genre.innerHTML = data.Genre;
    director.innerHTML = data.Director;

  } catch (err) {
    throw err;
  }

  favBtn.addEventListener('click', function () {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const img = document.querySelector(".img")
    const title = document.querySelector(".title")
    const type = document.querySelector(".type")

    const movie = {
        img: img.src,
        title: title.innerText,
        type: type.innerText
    };
    console.log(movie.img);

    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites()
  })
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favContainer = document.getElementById('favContainer');

  favorites.forEach(function(movie) {
    const movieElement = `
      <div class="favoriteMovie">
        <img src="${movie.img}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Type: ${movie.type}</p>
      </div>
    `;
    favContainer.innerHTML += movieElement;
  });
}