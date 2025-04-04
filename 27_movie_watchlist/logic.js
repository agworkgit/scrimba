// Variables

let movieList = document.getElementById('movie-list');
let listingImageContainer = document.getElementById('listing-image');
let listingIntro = document.getElementById('listing-intro');

const accessKey = '34763e45';
const searchBtn = document.getElementById('search-btn');

let searchTerm = '';
let listingTitle = '';
let listingRating = document.getElementById('listing-rating');

let posterArray = [];
let posterImage = '';
let posterTitle = '';
let posterRating = '';
let posterDuration = '';
let posterGenres = '';
let posterPlot = '';
let posterId = '';

let startPageTooltip = document.createElement("div");
startPageTooltip.setAttribute("id", "start-page-tooltip");

let startPageImage = document.createElement("img");
startPageImage.setAttribute("id", "tooltip-img");
startPageImage.setAttribute("src", "./assets/icons/movie.png");

let startPageSlogan = document.createElement("p");
startPageSlogan.setAttribute("id", "tooltip-slogan");
startPageSlogan.textContent = "Search for a title to add to watchlist";

startPageTooltip.append(startPageImage);
startPageTooltip.append(startPageSlogan);
movieList.append(startPageTooltip);

// Resources

let plusIcon = `./assets/icons/plus.png`;

// Get data from API

async function getData() {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${accessKey}&s=${searchTerm}`);
    const data = await res.json();

    // Create listing data

    // console.log(data);

    for (let i = 0; i < data.Search.length; i++) {

        // Get plots and ratings

        let imdbID = data.Search[i].imdbID;
        const textualRes = await fetch(`https://www.omdbapi.com/?apikey=${accessKey}&i=${imdbID}&plot=short&r=json`);
        const textualData = await textualRes.json();
        console.log(textualData);

        // Create listings

        // Set Poster

        if (
            data.Search[i].Poster === "N/A" ||
            (document.querySelector('#image-wrapper') &&
                parseFloat(getComputedStyle(document.querySelector('#image-wrapper')).width) < 16)
        )

        // Prevent image not found or 404 

        {
            posterImage = `./assets/images/placeholder-image.jpg`;
        } else {
            posterImage = data.Search[i].Poster;
        };

        posterTitle = data.Search[i].Title;

        // Set Rating

        if (textualData.Ratings.length === 0) {
            posterRating = 'Rating not available';
        } else {
            posterRating = textualData.Ratings[0].Value;
        }

        posterArray.push(textualData);
        posterDuration = textualData.Runtime;
        posterGenres = textualData.Genre;
        posterPlot = textualData.Plot;
        posterId = textualData.imdbID;

        // Image Wrapper
        let imageWrapper = document.createElement('div');
        imageWrapper.setAttribute('id', 'image-wrapper');

        // Image Source

        let listingImage = document.createElement("img");
        listingImage.setAttribute('src', `${posterImage}`);
        listingImage.setAttribute('id', 'listing-image');
        imageWrapper.append(listingImage);

        // Listing Wrapper

        let listingWrapper = document.createElement('div');
        listingWrapper.setAttribute('id', 'listing-wrapper');

        // Info Wrapper 

        let infoWrapper = document.createElement('div');
        infoWrapper.setAttribute('id', 'info-wrapper');

        // Title, Star, Rating, Plot

        let listingHighlight = document.createElement("div");
        listingHighlight.setAttribute('id', 'listing-highlight');

        let listingTitle = document.createElement("h2");
        listingTitle.setAttribute('id', 'listing-title');
        listingTitle.textContent = `${posterTitle}`;

        let listingStar = document.createElement("img");
        listingStar.setAttribute('id', 'listing-star');
        listingStar.setAttribute("src", `./assets/icons/star.png`);

        let listingRating = document.createElement("h3");
        listingRating.setAttribute('id', 'listing-rating');
        listingRating.textContent = `${posterRating}`;

        let listingDetails = document.createElement("div");
        listingDetails.setAttribute('id', 'listing-details');

        let listingDuration = document.createElement("p");
        listingDuration.setAttribute('id', 'listing-duration');
        listingDuration.textContent = `${posterDuration}`;

        let listingGenres = document.createElement("p");
        listingGenres.setAttribute('id', 'listing-genres');
        listingGenres.textContent = `${posterGenres}`;

        // Watchlist
        let watchlistBtn = document.createElement('button');
        watchlistBtn.setAttribute('id', 'watchlist-add');

        // Added data-id to be used for identification
        watchlistBtn.setAttribute('data-id', `${textualData.imdbID}`);
        watchlistBtn.classList.add('watchlist-save');
        watchlistBtn.innerHTML = `<img src='${plusIcon}' id='plus-icon'><p>Add To Watchlist</p>`;

        // Plot Wrapper

        let plotWrapper = document.createElement('div');
        plotWrapper.setAttribute('id', 'plot-wrapper');

        let listingPlot = document.createElement("p");
        listingPlot.setAttribute('id', 'listing-plot');
        listingPlot.classList.add('cut-text');
        listingPlot.textContent = `${posterPlot}`;

        // Appends

        listingHighlight.append(listingTitle);
        listingHighlight.append(listingStar);
        listingHighlight.append(listingRating);
        infoWrapper.append(listingHighlight);

        listingDetails.append(listingDuration);
        listingDetails.append(listingGenres);
        listingDetails.append(watchlistBtn);
        infoWrapper.append(listingDetails);
        plotWrapper.append(listingPlot);
        infoWrapper.append(plotWrapper);

        listingWrapper.append(imageWrapper);
        listingWrapper.append(infoWrapper);

        movieList.append(listingWrapper);
    }
}

// Get search term

searchBtn.addEventListener('click', () => {
    searchTerm = document.getElementById('search-input').value;
    console.log(searchTerm);
    movieList.innerHTML = '';
    getData();
});

// Save data & event delegation
movieList.addEventListener('click', function (event) {
    // Check if a button was clicked
    const button = event.target.closest('button');
    if (button) {
        const movieId = button.getAttribute('data-id');

        // You can use the movieId to get the specific movie details if needed
        const movieToSave = posterArray.find(movie => movie.imdbID === movieId);
        // Assuming you have access to the movies array

        // Save to localStorage
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        savedMovies.push(movieToSave);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

        console.log('Movie saved:', movieToSave);
    }
});