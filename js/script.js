console.log("this is the beginning of the code.");

// ----- constants -----
const mainURL = "https://api.punkapi.com/v2/beers"; //this may not be the root endpoint, commenting out to try root endpoint from documentation
console.log("after MainURL is defined" + mainURL);

// ----- variables -----
let beer, beerInfo;
console.log("second check: beer and beeInfo have been defined");

// ----- element references -----
const $ulEl = $(".box");
console.log("third check: $ulEl = $('.box'); has been defined");

//what do I want to show in my modal?
const name = $("#name"); // name
const tagline = $("#tagline"); //tagline
const description = $("#desc"); //description
const imgEL = $(".modal-content img"); //image_url
const foodPairing = $("#foodPairing"); //food pairing is in an array needs .join most likely
console.log("Fourth Check: Name, Tagline, Descr, ImgEL, foodParing have all been defined")

const $modal = $(".modal");
console.log("const $modal = $(.modal'); has been defined")

// ----- event listeners -----
// $ulEl should be the elements within the UL tags
//below code should listen for a click, only when span is clicked
// my span element can be sound in my generate html function - those tags are span.
$ulEl.on("click", "span", handleClick);
console.log("Event Listener $ulEl.on has been defined")

// ----- functions -----
// initialize modal 
// $modal.modal();
// const instance = M.Modal.getInstance($modal);
// $(document).ready(function() {
//     $('.modal').modal()
// });
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
// });
// The below code is to add amd event to the list made in HTML
function handleClick(event) {
    findBeer(event.target.dataset.url, true)
    console.log("function handleClick fired")
};

console.log("function handleClick has been defined")

//below is a function call to make the program run as soon as it is called
findBeer(mainURL);
console.log("findBeer has been called" + findBeer)

//below is calling the data
function findBeer(beerInfo, isBeer = false) {
    const url = beerInfo || isBeer;
    console.log("function findBeer fired" + beerInfo)
    $.ajax(url)
        .then(function(data) {
            if (!isBeer) {
                beer = data.results;
                render();
            } else {
                beerDetails = data;
                render(true);
            }
        }, function(error) {
            console.log("error is", error)
        });
};

// I will need a function to generate the HTML I will need, this function will creat dynamic html via jqeury
function generateHTML() {
    return beer.map(function(p) {
        console.log("function GenerateHTML fired as well as the beer.map function within")
        return `<li class="box">
                <div>${p.name}
                    <span  data-url="${p.beerInfo}">More</span>
                </div>
            </li>`
    });
}

console.log("function generateHTML has been defined")
    // Will need a function that transfers html to the DOM, here I wil likely also be defining my dynamic elements 
function render(isBeer = false) {
    if (!isBeer) {
        console.log("function render(beer) fired")
        const html = generateHTML().join("");
        $ulEl.html(html);
    } else {
        name.text("This beer is called..." + beerDetails.name + " ."); // name
        tagline.text("The tagline is" + beerDetails.tagline + "."); //tagline
        description.text("Description:" + beerDetails.description); //description
        $imgEL.attr('src', beerDetails.image_url); //image_url
        $imgEl.attr('alt', beerDetails.name); //this pulls the name of the beer for screenreaders/acessibility
        $foodPairing.text("Good pairings:" + beerDetails.food_paring.join(" , ")); //food pairing is in an array needs .join most likely
        console.log("instance.open() should run now");
        instance.open(); //opens the modal
        console.log("instance.open() successfully fired");
    }
};

console.log("render has been defined")