/**
 * Challenge: get a random image from Unsplash and set it as the background
 * 
 * Part 1:
 * 
 * URL: https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature
 * (You can change the "query" at the end to whatever theme you want)
 * 
 * Change the body's backgroundImage to: 
 * `url(<insert the URL of the iamge from the API here>)`
 * 
 * (You may need to dig around the response body a bit to find this URL)
 * 
 * (Note I've already added some CSS to resize the image within the window.
 * Instructions for this were found on CSS Tricks: 
 * https://css-tricks.com/perfect-full-page-background-image/#awesome-easy-progressive-css3-way)
 */


async function setBackgroundImage() {
    // Get a random image
    const data = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=minimal');
    const res = await data.json();
    const backgroundImageSrc = res.urls.full;

    // Set the body background to that image
    let docBody = document.getElementById('main-body');
    docBody.style.backgroundImage = `url(${backgroundImageSrc})`;
}

setBackgroundImage();