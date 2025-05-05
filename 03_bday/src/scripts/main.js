let photo = document.querySelector('#photo');

photo.addEventListener('mouseover', () => {
    photo.setAttribute('src', './src/assets/birthday.webp');
});

photo.addEventListener('mouseleave', () => {
    photo.setAttribute('src', './src/assets/picture.png');
})