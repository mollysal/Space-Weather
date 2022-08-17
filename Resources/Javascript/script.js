//Variables
//Variables Base HTML
var searchSection = document.querySelector('#searchSection');
var searchInput = document.querySelector('#searchInput');
var searchBtn = document.querySelector('#searchBtn');
var resultsSection = document.querySelector('#resultsSection');

var apiKey = '91490289d3ed1657769e6fb58b8a3895';

//------------------------------------------- FUNCTIONS ------------------------------------------- //
//When a user types in the Country code (i.e. USA) a bunch of cards populate with space launches in that country

let formSubmitHandler = function (e) {
  e.preventDefault();
  let countryName = searchInput.value.trim();
  //searchInput.value = "";

  //Clearing the results section each time there's a search
  resultsSection.innerHTML = "";

  //Setting Searched Location to Local Storage
  localStorage.setItem("Location", JSON.stringify(countryName));

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
        listItem.setAttribute("id", "card" + i);
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

let formSubmitLocation = function (e) {
  e.preventDefault();

  //Stephen said everything goes inside this if statement for weather
  if (e.target.matches(".card")) {

    var dataUrl = e.target.getAttribute("data-location");

    //Fetch to run data-location attribute
    fetch(dataUrl).then(function (res) {
      return res.json();
    }).then(function (data) {
      //return lat & long
      let lat = (data.pads[0].latitude);
      let lon = (data.pads[0].longitude)
      console.log(lat + ", " + lon);

      
      let spaceImg = (data.pads[0].map_image);
      let wiki = (data.pads[0].wiki_url);

      //taking the space API Location Lat & Lon into weather API
      let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

      fetch(apiUrl).then(function (res) {
        if (res.ok) {
          return res.json();
          console.log("json returned");
        } else {
          alert("Uh-oh Something went wrong!");
        }
        //If the results are valid display the weather
      }).then(function (data) {
        //Displaying Weather & Other Location Info after clicking on the location card

        //Clearing out Results Section to make room for Weather
        resultsSection.innerHTML = "";

        var weatherInfo = document.createElement('div');
        weatherInfo.className = "box-color";
        weatherInfo.textContent = data.current.temp + " °F";
        resultsSection.appendChild(weatherInfo);

        var weatherInfoImg = document.createElement('div');
        weatherInfoImg.src = spaceImg;
        weatherInfo.appendChild(weatherInfoImg + "Adding Image");

        var wikiLink = document.createElement('a');
        wikiLink.href = wiki;
        weatherInfo.appenedchid("Wikik Link: " + wikiLink);
  
      
      })
    })
      .catch(function (error) {
        console.log("ERROR with Weather API");
        return;
      })
  }
}

//Event Listners
searchBtn.addEventListener("click", formSubmitHandler);
//Cards don't exist so we can only add an event listner to the results section
resultsSection.addEventListener("click", formSubmitLocation);

