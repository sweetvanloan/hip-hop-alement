// ----- constants -----
const mainURL = "https://api.punkapi.com/v2/beers";

// ----- variables -----
let beer, beerInfo, beerDetails;

// ----- element references -----
const $ulEl = $(".box");
const name = $("#name");
const tagline = $("#tagline");
const description = $("#desc");
const imgEL = $(".modal-content img");
const foodPairing = $("#foodPairing");
const firstBrewed = $("firstBrewed");

// ----- event listeners -----
$ulEl.on("click", "span", handleClick);


// ----- functions -----
function handleClick(event) {
    findBeer(event.target.dataset.url, true)
};

findBeer(mainURL);

function findBeer(beerInfo) {
    const url = beerInfo;
    $.ajax(url)
        .then(function(data) {
            beerDetails = data;
            generateHTML(beerDetails);
        }, function(error) {
            console.log("error is", error)
        });
};

function generateHTML(beers) {
    beerInfo = beerDetails.map(function(beer) {
        return `
        <div class="beerBox" id="beerBox-${beer.id}">
        <h6 class="beerName">${beer.name}</h6>
        <br>
        <p id="hiddenInfo">The ${beer.name} beer was first brewed on ${beer.first_brewed}. A brewer tip, provided by ${beer.contributed_by} is: <br> "${beer.brewers_tips}"</p>
        <br>
        <p class="tagline">"${beer.tagline}"<p>
        <button data-target="modal-${beer.id}" class="btn modal-trigger z-depth-5 brown darken-4">More</button>
        <div class="button" style="width:100%;">
        </div>
        </div>`
    });

    moreInfo = beerDetails.map(function(beer) {
        return `
        <div id="modal-${beer.id}" class="modal z-depth-5 brown darken-4">
        <div class="modal-content">
        <img class="modalImage" src=${beer.image_url} alt="This is an image of the beer itself." height="300" wiidth="300"></img>
        <h4 class="modalTitle" id="name">${beer.name}</h4>
        <p class="modalItems" id="tagline">"${beer.tagline}"</p>
        <p class="modalItems" id="desc">${beer.description}</p>
        <p class="modalItems" id="foodPairing">This beer is good with: <br> ${beer.food_pairing.join("<br>")}</p>
        <button class="btn modal-close amber darken-4">Thanks!</button>
        </div>
        </div>
        `
    });
    render();


    $(".beerBox").hover(function(beers) {
        $(this).find("#hiddenInfo").css("opacity", 1)
    }, function() {
        $(this).find("#hiddenInfo").css("opacity", 0)
    });
}

function render() {
    beerInfo.forEach(function(item) {
        $ulEl.append(item);
    });

    moreInfo.forEach(function(item, idx) {
        $ulEl.append(item);
        $(`#modal-${idx + 1}`).modal()
    });
};