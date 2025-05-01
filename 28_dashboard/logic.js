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

// Container elements

let bodyWrapper = document.createElement('main');
bodyWrapper.setAttribute('id', 'body-wrapper');
document.body.append(bodyWrapper);

let bodyImage = document.createElement('div');
bodyImage.setAttribute('id', 'body-image');
bodyWrapper.append(bodyImage);

// Dashboard elements

let topContainer = document.createElement('div');
topContainer.setAttribute('id', 'top-container');
let cryptoContent = document.createElement('div'); // replace this with something else
cryptoContent.setAttribute('id', 'crypto-content');

let weatherContent = document.createElement('div');
weatherContent.setAttribute('id', 'weather-content');
let weatherTempIcon = document.createElement('div');
weatherTempIcon.setAttribute('id', 'weather-temp-icon');
let weatherIcon = document.createElement('img');
weatherIcon.setAttribute('id', 'weather-icon');
let weatherTemp = document.createElement('p');
weatherTemp.setAttribute('id', 'weather-temp-text');
let weatherLocation = document.createElement('p');

// Get Weather Info

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            weatherLocation.textContent = data.name;
            weatherTemp.textContent = Math.ceil((data.main.temp - 32) * 5 / 9) + '°'; // to Celsius
            console.log(weatherTemp);
        })
        .catch(err => console.error(err));
});

weatherTempIcon.append(weatherIcon);
weatherTempIcon.append(weatherTemp);
weatherContent.append(weatherTempIcon);
weatherContent.append(weatherLocation);

topContainer.append(cryptoContent);
topContainer.append(weatherContent);
bodyImage.append(topContainer);

// Display time

function updateTime() {
    const rawTime = new Date();
    const formattedTime = rawTime.toLocaleString('en-UK', { hour: 'numeric', hour12: true, minute: 'numeric' });
    midContainer.textContent = formattedTime.toLocaleUpperCase();
}

// Update time every second

setInterval(updateTime, 1000);

let midContainer = document.createElement('div');
midContainer.setAttribute('id', 'mid-container');
bodyImage.append(midContainer);

let botContainer = document.createElement('div');
botContainer.setAttribute('id', 'bot-container');
botContainer.textContent = 'Something Else...';
bodyImage.append(botContainer);

// Set background image

async function setBackgroundImage() {
    let backgroundImageSrc = undefined;

    try {
        // Get a random image
        const data = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=minimal+nature');
        const res = await data.json();
        // console.log(res.urls.regular);
        backgroundImageSrc = `${res.urls.regular}`;
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
            const imageAuthor = document.createElement('p');
            imageAuthor.textContent = `${backgroundImageAuthor} `;
            imageAuthor.setAttribute('id', 'image-author');
            botContainer.append(imageAuthor);
        }

        showImageAuthor();
    } catch (event) {
        console.error('There was an error fetching the resource ->', event);
        bodyImage.style.backgroundImage = `url(https://images.unsplash.com/photo-1556975603-548e36a3b0d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDQ2NTg3MTR8&ixlib=rb-4.0.3&q=80&w=1080)`;
    }
}

setBackgroundImage();

// Set crypto data

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error('Something went wrong.');
        } else {
            console.log(res.status);
            return res.json();
        }
    })
    .then(data => {
        console.log(data);
        let cryptoDetails = document.createElement('div');
        cryptoDetails.setAttribute('id', 'crypto-details');
        let cryptoIcon = document.createElement('img');
        cryptoIcon.setAttribute('src', `${data.image.small}`);
        cryptoIcon.setAttribute('id', 'crypto-icon');
        let cryptoName = document.createElement('p');
        cryptoName.textContent = data.name;
        cryptoName.setAttribute('id', 'crypto-name');
        let cryptoMarket = document.createElement('div');
        cryptoMarket.innerHTML = `
            <div id='current-price'>
                <img class='data-icons' src='./assets/icons/current.png'>
                <p>Current Price : £${data.market_data.current_price.gbp}</p>
            </div>
            <div id='up-price'>
                <img class='data-icons' src='./assets/icons/up.png'>
                <p>Market High : £${data.market_data.high_24h.gbp}</p>
            </div>
            <div id='down-price'>
                <img class='data-icons' src='./assets/icons/down.png'>
                <p>Market Low : £${data.market_data.low_24h.gbp}</p>
            </div>
        `;
        cryptoMarket.setAttribute('id', 'market-data');
        cryptoDetails.append(cryptoIcon);
        cryptoDetails.append(cryptoName);
        cryptoContent.append(cryptoDetails);
        cryptoContent.append(cryptoMarket);
    })
    .catch(err => console.error(err)); // fetch error handling
