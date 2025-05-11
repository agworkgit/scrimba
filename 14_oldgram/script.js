const wrapper = document.getElementById('wrapper');

const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "assets/profile/avatar-vangogh.png",
        post: "images/post-vangogh.png",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "assets/profile/avatar-courbet.png",
        post: "images/post-courbet.png",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "assets/profile/avatar-ducreux.png",
        post: "images/post-ducreux.png",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
];

function createPost() {
    let post = '';
    for (let i = 0; i < posts.length; i++) {
        post += `<article class='post'>
                    <section class='user'>
                        <img class='poster-profile' src="${posts[i].avatar}" alt="Van Gogh">
                        <div class='user-info'>
                            <p id='user-name'>${posts[i].name}</p>
                            <p id='user-location'>${posts[i].location}</p>
                        </div>
                    </section>

                    <section id='uploads'>
                        <img class='user-upload-image' src="${posts[i].post}" alt="Some guy">
                    </section>

                    <section class='actions'>
                        <img class='action-logo like-btn' src="./assets/icons/like.svg" alt="">
                        <img class='action-logo comment-btn' src="./assets/icons/comment.svg" alt="">
                        <img class='action-logo share-btn' src="./assets/icons/share.svg" alt="">
                    </section>

                    <section id='count'>
                        <span class='heavy-font'>${posts[i].likes}</span>
                        <p>likes</p>
                    </section>

                    <section id='comment'>
                        <span class='heavy-font'>${posts[i].username}</span>
                        <p>${posts[i].comment}</p>
                    </section>

                    <div class='separator'></div>
                </article>`;
    }

    return post;
}

wrapper.innerHTML = createPost();