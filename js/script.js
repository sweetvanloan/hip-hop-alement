console.log("this is the beginning of the code.");

// ----- constants -----
const mainURL = "https://api.punkapi.com/v2/beers";
console.log("after MainURL is defined " + mainURL);

// ----- variables -----
let beer, beerInfo, beerDetails;
console.log("second check: beer and beerInfo have been set " + beer + " " + beerInfo);


// ----- element references -----
const $ulEl = $(".box");
console.log("third check: $ulEl = $('.box'); has been defined");

//what do I want to show in my modal?
const name = $("#name"); // name
const tagline = $("#tagline"); //tagline
const description = $("#desc"); //description
const imgEL = $(".modal-content img"); //image_url
const foodPairing = $("#foodPairing"); //food pairing is in an array needs .join most likely
//adding more info to optimize user experience
const firstBrewed = $("firstBrewed"); //date the beer was first brewed
console.log("Fourth Check: Name, Tagline, Descr, ImgEL, foodParing have all been defined")

const $modal = $(".modal");
console.log("const $modal = $(.modal'); has been defined")

// ----- event listeners -----
// $ulEl should be the elements within the UL tags
//below code should listen for a click, only when span is clicked
// my span element can be sound in my generate html function - those tags are span.
$ulEl.on("click", "span", handleClick);
console.log("Event Listener $ulEl.on has been defined");



// ----- functions -----
// initialize modal 
document.addEventListener('DOMContentLoaded', function() {


    var elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems);
    // var instances = M.Modal.init(elems, options);
    // modalInfo()


});


//event listener funtion
function handleClick(event) {
    findBeer(event.target.dataset.url, true)
    console.log("function handleClick fired")
};

console.log("function handleClick has been defined")

//below is a function call to make the program run as soon as it is called
findBeer(mainURL);
console.log("findBeer has been called " + findBeer.val);

//below is calling the data
function findBeer(beerInfo) {
    const url = beerInfo;
    console.log("function findBeer fired " + beerInfo)
    $.ajax(url)
        .then(function(data) {
            console.log("data before turning it into beerDetails is CALLED:" + data);
            beerDetails = data;
            generateHTML(beerDetails);
            // modalInfo(beerDetails)
        }, function(error) {
            console.log("error is", error)
        });
};

// I will need a function to generate the HTML I will need, this function will creat dynamic html via jqeury
function generateHTML(beers) {
    console.log("in GenHTML beer details = " + beerDetails)
    console.log("function GenerateHTML fired as well as the beer.map function within")


    beerInfo = beerDetails.map(function(b) {
        return `<ul class="box">
        <div id="beerBox" >
        <h6 class="beerName">${b.name}</h6>
        <br>
        <p id="hiddenInfo">The ${b.name} beer was first brewed on ${b.first_brewed}. A brewer tip, provided by ${b.contributed_by} is: ${b.brewers_tips}</p>
        <br>
        <p class="tagline">"${b.tagline}"<p>
        <button data-target="modal1" class="btn modal-trigger z-depth-5 brown darken-4" data-url="${b.beerInfo}">More</button>
        <div class="button" style="width:100%;">
        </div>
        </div>
        </ul>`
    });

    moreInfo = beerDetails.map(function(b) {

            return `
        <div id="modal1">

        <div>${b.image_url}</div>
        <h4 id="name">${b.name}</h4>
        <p id="tagline">${b.tagline}</p>
        <p id="desc">${b.description}</p>
        <p id="foodPairing">${b.food_pairing}</p>
        <button data-target="modal1" class="btn modal-close amber darken-4">Thanks!</button>
        
        </div>
        `
        }) //this does not create my modal but also does not break my code
    render(); //this render makes sure that my below hover function works.


    $(".box").hover(function(beers) {
        console.log($(this).find("#hiddenInfo"));
        $(this).find("#hiddenInfo").css("opacity", 1)
    }, function() {
        $(this).find("#hiddenInfo").css("opacity", 0)
    }); // this function looks for the "box" class and finds elements with the id of hiddenInfo, making them 100% opacity when hovered over the box, but 0 when not hovered over the box. 
    //currently this function ONLY works for the first of the beers in the array. 
    //encapsultaint this in a .forEach function did not work. 





    // render(); //this was commented out when the render before my .hover function was fixed 
}

// modalInfo()

// function modalInfo(beerDetails) {

//     console.log("beer details is " + beerDetails)
//     console.log("modalInfo")
//     beerInfo = beerDetails.map(function(b) {

//         b.name.text("This beer is called..." + item.name + " ."); // name

//         // console.log("name in render");
//         // tagline.text("The tagline is" + item.tagline + "."); //tagline
//         // console.log("tagline in render");
//         // description.text("Description:" + item.description); //description
//         // firstBrewed.text("first brewed:" + item.first_brewed); // date the beer was first brewed.
//         // console.log("descr in render");
//         // $imgEL.attr('src', item.image_url); //image_url
//         // $imgEl.attr('alt', item.name); //this pulls the name of the beer for screenreaders/acessibility
//         // console.log("both img lines in render");
//         // $foodPairing.text("Good pairings:" + item.food_paring.join(" , ")); //food pairing is in an array needs .join most likely
//         // console.log("foodPairing in render");
//         // console.log("instance.open() should run now");
//         // instance.open(); //opens the modal

//     })
// }




console.log("function generateHTML has been defined")

function render() {
    beerInfo.forEach(function(item) {
        return $ulEl.append(item);

        // console.log("instance.open() successfully fired");
        // generateHTML(item);
    });

};

console.log("render has been defined")
console.log("this is the end of the code")