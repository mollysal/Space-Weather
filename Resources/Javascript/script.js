function getAPI() {
    var url = "https://lldev.thespacedevs.com/2.2.0/location/"
  //hook: ?search=usa"

    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
        console.log(data);
      }
    });
}

getAPI();

//When a user types in the Country code (i.e. USA) a bunch of cards populate with space launches in that country
//when a user clicks on a launch location, the weather populates 

//Variables

var searchInfo = $('#searchInfo'); 
