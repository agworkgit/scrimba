/**
Challenge: 

When the button is clicked, call out to the Bored API
(URL: https://apis.scrimba.com/bored/api/activity)
and replace the h4 with the activity from the API

*/

const fetchPlaceholder = document.querySelector('#fetch-placeholder');
const fetchBtn = document.querySelector('#fetch-btn');

fetchBtn.addEventListener('click', () => {
    fetch('https://apis.scrimba.com/bored/api/activity')
        .then(request => request.json())
        .then(function (data) {
            // console.log(data.activity)

            fetchPlaceholder.textContent = data.activity;
        });
});
