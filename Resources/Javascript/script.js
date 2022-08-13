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
