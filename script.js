const accessKey = "5VUu9eKVUIyB-DVsnzkEJna3jEE6LQnfL_Fxdyn9KTY";

const formElm = document.querySelector("form");
const inputlElm = document.getElementById("search-input");
const divElements = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");


let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputlElm.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;


    if (page === 1) {
        divElements.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        divElements.appendChild(imageWrapper);


    });


    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

formElm.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmore.addEventListener("click", (event) => {

    searchImages();
});