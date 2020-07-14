console.log("this is the beginning of the code.");

// ----- constants -----
const mainURL = "https://api.punkapi.com/v2/beers"; //this may not be the root endpoint, commenting out to try root endpoint from documentation
console.log("after MainURL is defined " + mainURL);

// ----- variables -----
let beer, beerInfo, beerDetails;
console.log("second check: beer and beeInfo have been set " + beer + " " + beerInfo);

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
findBeer(mainURL); //took out the argument mainURL to see if that is the bug
console.log("findBeer has been called " + findBeer.val) //findBeer is currently holding the value of undefined, which may be the big issue - investigating 

//below is calling the data
function findBeer(beerInfo) {
    const url = beerInfo; //I don't get what this even has to do with anything but taking it out causes an error rabbithole
    console.log("function findBeer fired " + beerInfo)
    $.ajax(url)
        .then(function(data) {
            // 
            console.log(data);
            beerDetails = data;
            generateHTML(beerDetails);
        }, function(error) {
            console.log("error is", error)
        });
};

// I will need a function to generate the HTML I will need, this function will creat dynamic html via jqeury
function generateHTML(beers) {
    console.log(beerDetails)
    console.log("function GenerateHTML fired as well as the beer.map function within")
    beerInfo = beerDetails.map(function(b) {
        return `<ul class="box">
                    <div>${b.name}
                        <span  data-url="${b.beerInfo}">More</span>
                    </div>
                </ul>`

    });

    render();

}

console.log("function generateHTML has been defined")
    // Will need a function that transfers html to the DOM, here I wil likely also be defining my dynamic elements 
function render() {
    // if (!isBeer) {
    beerInfo.forEach(function(item) {
        $ulEl.append(item);

        console.log("next code is name.text in render");
        name.text("This beer is called..." + item.name + " ."); // name
        console.log("name in render");
        tagline.text("The tagline is" + item.tagline + "."); //tagline
        console.log("tagline in render");
        description.text("Description:" + item.description); //description
        console.log("descr in render");
        $imgEL.attr('src', item.image_url); //image_url
        $imgEl.attr('alt', item.name); //this pulls the name of the beer for screenreaders/acessibility
        console.log("both img lines in render");
        $foodPairing.text("Good pairings:" + item.food_paring.join(" , ")); //food pairing is in an array needs .join most likely
        console.log("foodPairing in render");
        console.log("instance.open() should run now");
        instance.open(); //opens the modal
        console.log("instance.open() successfully fired");
        generateHTML(item);
    });

};

console.log("render has been defined")