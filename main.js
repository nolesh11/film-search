// переменные

const searchBtn = document.getElementById('searchButton')
const favBtn = document.getElementById('favBtn')

searchBtn.addEventListener('click', getFilm)

// асинхронные функции

async function getFilm () {
  const searchInput = document.getElementById('searchInput').value
  const img = document.querySelector('.img')
  const title = document.querySelector('.title')
  const type = document.querySelector('.type')
  const year = document.querySelector('.year')
  const runTime = document.querySelector('.runTime')
  const genre = document.querySelector('.genre')
  const director = document.querySelector('.director')

  const url = `https://www.omdbapi.com/?t=${searchInput}&i=tt3896198&apikey=83199631`
  const response = await fetch(url)
  const data = await response.json()

  img.src = data.Poster
  title.innerHTML = data.Title
  type.innerHTML = data.Type
  year.innerHTML = data.Year
  runTime.innerHTML = data.Runtime
  genre.innerHTML = data.Genre
  director.innerHTML = data.Director

  favBtn.addEventListener('click', function () {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const img = document.querySelector('.img')
    const title = document.querySelector('.title')
    const type = document.querySelector('.type')
    const year = document.querySelector('.year')
    const runTime = document.querySelector('.runTime')
    const genre = document.querySelector('.genre')
    const director = document.querySelector('.director')

    const movie = {
      img: img.src,
      title: title.innerText,
      type: type.innerText,
      year: year.innerText,
      runTime: runTime.innerText,
      genre: genre.innerText,
      director: director.innerText
    }
    console.log(movie.img)

    favorites.push(movie)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    displayFavorites()
  })

  favBtn.classList.add('active')
}

function displayFavorites () {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  const favContainer = document.getElementById('favContainer')

  favorites.forEach(function (movie) {
    const movieElement = `
      <div class="favoriteMovie">
        <img src="${movie.img}" alt="${movie.title}">
        <div>${movie.title}</div>
        <div>Type: ${movie.type}</div>
        <div>Year: ${movie.year}</div>
        <div>Run time: ${movie.runTime}</div>
        <div>Genre: ${movie.genre}</div>
        <div>Director: ${movie.director}</div>
      </div>
    `

    favContainer.innerHTML += movieElement
  })
}

const theameMode = document.getElementById('theameMode')
const tumbler = document.getElementById('tumbler')
const container = document.getElementById('container')
const searchContainer = document.getElementById('searchContainer')
const filmResult = document.getElementById('filmResult')
const h1 = document.getElementById('header')

let isTumblerRight = false
theameMode.addEventListener('click', () => {
  console.log('hi')
  if (isTumblerRight) {
    theameMode.style.background = 'white'
    tumbler.style.background = 'black'
    tumbler.style.transform = 'translateX(0)'
    container.style.background = '#ffffff80'
    searchContainer.style.background = '#ffffff80'
    h1.style.color = 'black'
    filmResult.style.background = '#ffffff80'
  } else {
    theameMode.style.background = 'black'
    tumbler.style.background = 'white'
    tumbler.style.transform = 'translateX(35px)'
    container.style.background = '#565555'
    searchContainer.style.background = '#565555'
    h1.style.color = '#ffffff80'
    filmResult.style.background = '#565555'
  }
  isTumblerRight = !isTumblerRight
})
