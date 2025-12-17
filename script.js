const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6b728f8c7bac8f44ee17beb217a5a572&page=1";
const API_THUMBNAIL = "https://image.tmdb.org/t/p/w1280";
const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=6b728f8c7bac8f44ee17beb217a5a572&query=';

const search = document.getElementById('search');
const form = document.getElementById('form');
const main = document.getElementById('main');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query =  search.value;
    
    if(query && query !== '') {
        fetchMovies(API_SEARCH + query);
        search.value = ''; 
    } else {
        window.location.reload();
    }
})

function displayMovies(movies) {
    main.innerHTML = ''; //clear main el
    movies.forEach((e) => {
        const { title, overview, vote_average, poster_path } = e; //deconstruct el based on API paths
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.innerHTML = `
                <img src="${poster_path ? API_THUMBNAIL + poster_path : 'placeholder.jpg'}" alt="${title}"> 
                <div class="title-rating">
                    <h3>${title}</h3>
                    <span class="${ratingColor(vote_average)}">${vote_average.toFixed(1)}</span>
                </div>
                <div class="movie-sum">
                    <h3>Overview</h3>
                    ${overview}
                </div>
        `;
        main.append(movie);
    })
};

function ratingColor(vote_average) {
    if (vote_average >= 8) {
        return 'great'
    } else if (vote_average >= 5) {
        return 'average'
    } else {
        return 'awful'
    }
}

async function fetchMovies(url) {
    const res = await fetch(url); //return promise
    const data = await res.json(); //consume promise -> fetch data
    displayMovies(data.results);
};


fetchMovies(API)