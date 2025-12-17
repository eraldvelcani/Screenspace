const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6b728f8c7bac8f44ee17beb217a5a572&page=1";
const API_THUMBNAIL = "https://image.tmdb.org/t/p/w500/w1280";
const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=6b728f8c7bac8f44ee17beb217a5a572&query="';

const search = document.getElementById('search');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query =  search.value;
    
    if(query && query !== '') {
        fetchMovies(API_SEARCH + query);
        query.value = ''; 
    } else {
        window.location.reload();
    }
})

async function fetchMovies(url) {
    const res = await fetch(url); //return promise
    const data = await res.json(); //consume promise -> fetch data

    console.log(data.results);
}