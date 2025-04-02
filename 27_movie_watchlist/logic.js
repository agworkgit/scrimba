// Variables

let movieList = document.getElementById('movie-list');
let listingImageContainer = document.getElementById('listing-image');
let listingIntro = document.getElementById('listing-intro');

const accessKey = '34763e45';
const searchBtn = document.getElementById('search-btn');

let searchTerm = '';
let posterImage = '';
let listingTitle = '';
let listingRating = document.getElementById('listing-rating');

// Resources

let plusIcon = `./assets/icons/plus.png`;

// Get data from API

async function getData() {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${accessKey}&s=${searchTerm}`);
    const data = await res.json();

    // Create listing data

    console.log(data);

    for (let i = 0; i < data.Search.length; i++) {

        // Get plots and ratings

        let imdbID = data.Search[i].imdbID;
        const textualRes = await fetch(`http://www.omdbapi.com/?apikey=${accessKey}&i=${imdbID}&plot=short&r=json`);
        const textualData = await textualRes.json();
        console.log(textualData);

        // Create listings

        posterImage = data.Search[i].Poster;
        posterTitle = data.Search[i].Title;
        posterRating = textualData.Ratings[0].Value;
        posterDuration = textualData.Runtime;
        posterGenres = textualData.Genre;
        posterPlot = textualData.Plot;

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
        watchlistBtn.innerHTML = `<img src='${plusIcon}' id='plus-icon'><p>Watchlist</p>`;

        // Plot Wrapper

        let plotWrapper = document.createElement('div');
        plotWrapper.setAttribute('id', 'plot-wrapper');

        let listingPlot = document.createElement("p");
        listingPlot.setAttribute('id', 'listing-plot');
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

