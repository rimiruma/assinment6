// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch the categories data
//     fetch("https://openapi.programming-hero.com/api/videos/categories")
//         .then(response => response.json())
//         .then(data => {
//             const categoriesContainer = document.querySelector(".categories");

//             // Create and populate the category buttons
//             data.data.forEach(category => {
//                 const categoryButton = document.createElement("button");
//                 categoryButton.textContent = category.category;
//                 categoryButton.addEventListener("click", () => {
//                     fetchVideosByCategory(category.category_id);
//                 });
//                 categoriesContainer.appendChild(categoryButton);
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching categories:", error);
//         });

//     // Function to fetch and display videos by category
//     function fetchVideosByCategory(categoryId) {
//         fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
//             .then(response => response.json())
//             .then(data => {
//                 const videosContainer = document.querySelector(".videos");
//                 videosContainer.innerHTML = ""; // Clear existing video cards

//                 // Create and populate video cards
//                 data.data.forEach(video => {
//                     const videoCard = document.createElement("div");
//                     videoCard.classList.add("video-card");
//                     videoCard.innerHTML = `
//                         <img src="${video.thumbnail}" alt="${video.title}">
//                         <h3>${video.title}</h3>
//                         <p>Views: ${video.others.views}</p>
//                         <p>Posted Date: ${video.others.posted_date}</p>
//                         <p>Author: ${video.authors[0].profile_name}</p>
//                     `;
//                     videosContainer.appendChild(videoCard);
//                 });
//             })
//             .catch(error => {
//                 console.error("Error fetching videos:", error);
//             });
//     }
// });





document.addEventListener("DOMContentLoaded", function () {
    // Fetch the categories data
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then(response => response.json())
        .then(data => {
            const categoriesContainer = document.querySelector(".categories");
            const videosContainer = document.querySelector(".videos");

            // Create and populate the category buttons
            data.data.forEach(category => {
                const categoryButton = document.createElement("button");
                categoryButton.textContent = category.category;
                categoryButton.addEventListener("click", () => {
                    fetchVideosByCategory(category.category_id);
                });
                categoriesContainer.appendChild(categoryButton);
            });

            // Load the data for the first category by default
            if (data.data.length > 0) {
                fetchVideosByCategory(data.data[0].category_id);
            } else {
                // Handle the case when there are no categories
                videosContainer.innerHTML = '<img src="./Logo.png" alt="No Data">';
            }
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });

    // Function to fetch and display videos by category
    function fetchVideosByCategory(categoryId) {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                const videosContainer = document.querySelector(".videos");
                videosContainer.innerHTML = ""; // Clear existing video cards

                if (data.data.length === 0) {
                    // Handle the case when there is no data for the category
                    videosContainer.innerHTML = '<img src="./Icon.png" alt="No Data">';
                } else {
                    // Create and populate video cards
                    data.data.forEach(video => {
                        const videoCard = document.createElement("div");
                        videoCard.classList.add("video-card");
                        videoCard.innerHTML = `
                            <img src="${video.thumbnail}" alt="${video.title}">
                            <h3>${video.title}</h3>
                            <p>Views: ${video.others.views}</p>
                            <p>Posted Date: ${video.others.posted_date}</p>
                            <p>Author: ${video.authors[0].profile_name}</p>
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
