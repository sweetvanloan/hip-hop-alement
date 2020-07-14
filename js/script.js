/*----- constants -----*/
const mainURL = "https://api.punkapi.com/v2/beers"; //this may not be the root endpoint, commenting out to try root endpoint from documentation

// const mainURL = "https://api.punkapi.com/v2/"; // this syntax caused an error rather than data

console.log(mainURL)
    /*----- variables -----*/
let beer, beerInfo;

/*----- element references -----*/
const $ulEl = $(".box")

//what do I want to show in my modal?
const name = $("#name"); // name
const tagline = $("#tagline"); //tagline
const description = $("#desc"); //description
const imgEL = $(".modal-content img"); //image_url
const foodPairing = $("#foodPairing"); //food pairing is in an array needs .join most likely
const $modal = $(".modal");


/*----- event listeners -----*/
// $ulEl should be the elements within the UL tags
//below code should listen for a click, only when span is clicked
// my span element can be sound in my generate html function - those tags are span.
$ulEl.on("click", "span", handleClick);


/*----- functions -----*/
// initialize modal 
$modal.modal();
const instance = M.Modal.getInstance($modal);

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

//below is a function call to make the program run as soon as it is called
findBeer(); // commented out this syntax findBeer(mainURL);

// //below is calling the data //attemtping new structure 
// function findBeer(beerInfo, moreBeer = false) {
//     const url = beerInfo || moreBeer;
//     // const url = beerInfo; //this line seems to cause issues so commenting it out to see if it helps
//     console.log("function findBeer fired" + beerInfo)

//     $.ajax(url)
//         .then(
//             (data) => {
//                 console.log("Data is:", data);
//                 beer = data[0]; //took out data[0].name
//                 render(beer);
//             },

//             (error) => {
//                 console.log("error is:", error);
//             }
//         );
// }


//below is calling the data
function findBeer(beerInfo, isBeer = false) {
    const url = beerInfo || isBeer;
    // const url = beerInfo; //this line seems to cause issues so commenting it out to see if it helps
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
}

// I will need a function to generate the HTML I will need, this function will creat dynamic html via jqeury
function generateHTML() {
    return beer.map(function(p) { //changed from return beer.map(function(p) - which had an error stating it was not a function
        console.log("function GenerateHTML fired as well as the beer.map function within")
        return `<li class="box">
                <div>${p.name}
                    <span  data-url="${p.beerInfo}">More</span>
                </div>
            </li>`
    });
}


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
        console.log("instance.open() successfully fired")
    }
}