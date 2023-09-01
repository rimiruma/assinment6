

document.addEventListener("DOMContentLoaded", function () {

    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then(response => response.json())
        .then(data => {
            const categoriesContainer = document.querySelector(".categories");
            const videosContainer = document.querySelector(".videos");


            data.data.forEach(category => {
                const categoryButton = document.createElement("button");
                categoryButton.textContent = category.category;
                categoryButton.addEventListener("click", () => {
                    fetchVideosByCategory(category.category_id);
                });
                categoriesContainer.appendChild(categoryButton);
            });

            if (data.data.length > 0) {
                fetchVideosByCategory(data.data[0].category_id);
            } else {
                videosContainer.innerHTML = '<img src="./Logo.png" alt="No Data">';
            }
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });

    function fetchVideosByCategory(categoryId) {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                const videosContainer = document.querySelector(".videos");
                videosContainer.innerHTML = "";

                if (data.data.length === 0) {
                    videosContainer.innerHTML = '<img src="./Icon.png" alt="No Data">';
                } else {
                    data.data.forEach(video => {
                        const videoCard = document.createElement("div");
                        const author = video.authors[0];
                        const authorName = author.profile_name;
                        const isVerified = author.verified;
                        videoCard.classList.add("video-card");
                        const authorHTML = `
    <p class="authorName">${authorName} ${isVerified ? '<img src="./verifide.png" alt="Verified" id="verifiedIcon">' : ''}</p>
`;
                        videoCard.innerHTML = `
                            <img src="${video.thumbnail}" alt="${video.title}">
                            <div class="ProfileNameImage">
                            <img src="${video.authors[0].profile_picture}">
                            <h3>${video.title}</h3>
                            </div>
                            ${authorHTML}
                            <p class="autheorView">${video.others.views} Views</p>
                        `;
                        videosContainer.appendChild(videoCard);
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }




});
