// Variables

let movieList = document.getElementById('movie-list');

const movieDataString = localStorage.getItem('savedMovies'); // Use the title to get the data
if (movieDataString) {
    const movieData = JSON.parse(movieDataString);
    console.log(movieData); // Use movieData as needed
    for (let i = 0; i < movieData.length; i++) {
        // Create listings

        // Set Poster

        if (
            movieData[i].Poster === "N/A" ||
            (document.querySelector('#image-wrapper') &&
                parseFloat(getComputedStyle(document.querySelector('#image-wrapper')).width) < 16)
        )

        // Prevent image not found or 404 

        {
            posterImage = `./assets/images/placeholder-image.jpg`;
        } else {
            posterImage = movieData[i].Poster;
        };

        posterTitle = movieData[i].Title;

        // Set Rating

        if (movieData[i].Ratings.length === 0) {
            posterRating = 'Rating not available';
        } else {
            posterRating = movieData[i].Ratings[0].Value;
        }

        posterDuration = movieData[i].Runtime;
        posterGenres = movieData[i].Genre;
        posterPlot = movieData[i].Plot;
        posterId = movieData[i].imdbID;

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

        /*         // Watchlist
                let watchlistBtn = document.createElement('button');
                watchlistBtn.setAttribute('id', 'watchlist-add');
            
                // Added data-id to be used for identification
                watchlistBtn.setAttribute('data-id', `${movieData.imdbID}`);
                watchlistBtn.classList.add('watchlist-save');
                watchlistBtn.innerHTML = `<img src='${plusIcon}' id='plus-icon'><p>Add To Watchlist</p>`; */

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
        // listingDetails.append(watchlistBtn);
        infoWrapper.append(listingDetails);
        plotWrapper.append(listingPlot);
        infoWrapper.append(plotWrapper);

        listingWrapper.append(imageWrapper);
        listingWrapper.append(infoWrapper);

        movieList.append(listingWrapper);
    }
}

