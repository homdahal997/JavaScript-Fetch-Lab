/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
async function initialLoad() {
    let apiData = await axios.get(`https://api.thecatapi.com/v1/breeds/?api_key=${API_KEY}`);
    let jsonData = apiData.data;

    jsonData.forEach(data => {
        let option = document.createElement("option");
        option.value = data.id;
        option.textContent = data.name;
        breedSelect.appendChild(option);
    });

    return "initialLoad completed";
}

breedSelect.addEventListener("change", async (evt) => {
    if (evt.target.value === "") {
        Carousel.clear();
    }

    let response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=${evt.target.value}&api_key=${API_KEY}`);
    let jsonData = response.data;
    let carouselInnerEl = document.getElementById("carouselInner");
    let infoTitle = document.createElement("h5");
    let infoText = document.createElement("p");

    Carousel.clear();
    carouselInnerEl.innerHTML = "";
    infoDump.innerHTML = "";
    jsonData.forEach(data => {
        let image = document.createElement("img");
        image.src = data.url;
        image.classList.add("carousel-inner", "card");
        carouselInnerEl.append(image);
        infoTitle.classList.add("card-title", "text-center");
        infoTitle.innerText = `${jsonData[0].breeds[0].name}`;
        infoText.classList.add("card-text");
        infoText.innerText = jsonData[0].breeds[0].description;
        infoDump.classList.add("card", "w-75");
        infoDump.append(infoTitle, infoText);
        Carousel.start();
    });
});

initialLoad().then((x) => {
    console.log(x)
});