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

let bodyWrapper = document.createElement('div');
bodyWrapper.setAttribute('id', 'body-wrapper');
document.body.append(bodyWrapper);

let bodyImage = document.createElement('div');
bodyImage.setAttribute('id', 'body-image');
bodyWrapper.append(bodyImage);

async function setBackgroundImage() {
    // Get a random image
    const data = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=minimal');
    const res = await data.json();
    const backgroundImageSrc = `${res.urls.regular}`;
    let backgroundImageAuthor = '';

    if (res.user.last_name != null) {
        backgroundImageAuthor = `Image by : ${res.user.first_name} ${res.user.last_name} `;
    } else {
        backgroundImageAuthor = `Image by : ${res.user.first_name}`;
    }

    // Set the body background to that image
    bodyImage.style.backgroundImage = `url(${backgroundImageSrc})`;

    // Show Image Author
    function showImageAuthor() {
        const imageAuthor = document.createElement('h3');
        imageAuthor.textContent = `${backgroundImageAuthor} `;
        imageAuthor.setAttribute('id', 'image-author');
        bodyImage.append(imageAuthor);
    }

    showImageAuthor();
}

setBackgroundImage();
