const movieDataString = localStorage.getItem(movieTitle); // Use the title to get the data
if (movieDataString) {
    const movieData = JSON.parse(movieDataString);
    console.log(movieData); // Use movieData as needed
}