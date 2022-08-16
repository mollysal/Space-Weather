//Variables
//Variables Base HTML
var searchSection = document.querySelector('#searchSection'); 
var searchInput = document.querySelector('#searchInput');
var searchBtn = document.querySelector('#searchBtn');
var resultsSection = document.querySelector('#resultsSection');

var apiKey = '8c1219fa65fe7f4d84bf59a3a16e277d';

//------------------------------------------- FUNCTIONS -------------------------------------------
//When a user types in the Country code (i.e. USA) a bunch of cards populate with space launches in that country

let formSubmitHandler = function(e) {
  e.preventDefault();
  let countryName = searchInput.value.trim();
  searchInput.value = "";
  //Clearing the results section each time there's a search
  resultsSection.innerHTML = "";

  if (countryName) {
    getSpaceAPI(countryName);
    console.log("after clicking: " + countryName);
  } else {
    alert("Enter Valid Country!");
    return;
  }
}

let countryName = searchInput.value;
console.log("After Let: " + countryName);

function getSpaceAPI(countryName) {
  //Example from Stephen: https://lldev.thespacedevs.com/2.2.0/location/?search=usa
    var url = "https://lldev.thespacedevs.com/2.2.0/location/?search=" + countryName;
  //hook: ?search=usa"
  console.log("From API " + countryName);

    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //For Each Result Print into a Card
      for (var i = 0; i < data.results.length; i++) {
        //create element - a HTML element only
        var listItem = document.createElement('div');
        listItem.className = "card py-3";
        listItem.setAttribute("id","card"+i);
        listItem.setAttribute("data-location", data.results[i].url);
        listItem.textContent = data.results[i].name;
        resultsSection.appendChild(listItem);
        console.log(data.results[i].name);
      }
    });
}

getSpaceAPI();


//when a user clicks on a launch location, the weather populates 
//How do we target each card element created?

let formSubmitLocation = function(e) {
  e.preventDefault();
  if (e.target.matches(".card")) {
    //Fetch to run data-location attribute

    //return lat & long

    //run lat & lon through weather API

    //Print weather inside of card
    
    
  }
}

//Event Listners
searchBtn.addEventListener("click", formSubmitHandler);
//Cards don't exist so we can only add an event listner to the results section
resultsSection.addEventListener("click", formSubmitLocation);

