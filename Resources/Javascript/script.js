//Variables
var searchSection = document.querySelector('#searchSection'); 
var searchInput = document.querySelector('#searchInput');
var searchBtn = document.querySelector('#searchBtn');
var resultsSection = document.querySelector('#resultsSection');

var apiKey = '8c1219fa65fe7f4d84bf59a3a16e277d';

let formSubmitHandler = function(e) {
  e.preventDefault();
  let countryName = searchInput.value.trim();
  searchInput.value = "";

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
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data.results[i].name;
        resultsSection.appendChild(listItem);
        console.log(data);
      }
    });
}

getSpaceAPI();

//When a user types in the Country code (i.e. USA) a bunch of cards populate with space launches in that country
//when a user clicks on a launch location, the weather populates 



//Event Listners
searchBtn.addEventListener("click", formSubmitHandler);
//searchBtn.on("click", getSpaceAPI);
