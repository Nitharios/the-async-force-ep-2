// jshint esversion:6
// DOCUMENT ARRAYS ARE SPLIT INTO PAGES
// if Id > 9 ...
console.log('Sanity Check: The Async Force Episode 2');
const working = 'It works!';

(function episodeTwo() {

  const resourceType = document.getElementById("resourceType");
  const resourceId = document.getElementById("resourceId");
  const requestResourceButton = document.getElementById("requestResourceButton");
  
  let typeSelected, 
      idSelected;

  // resourceType.addEventListener("change", resourceSelector);
  requestResourceButton.addEventListener("click", resourceSelector);

  // selects the option taken by user
  function resourceSelector() {
    typeSelected = document.getElementById("resourceType").value;
    idSelected = document.getElementById("resourceId").value;
    retrieveAPI("https://swapi.co/api/");
  }

  // opens the request for the data from the provided URL
  function retrieveAPI(url) {
    let apiRequest = new XMLHttpRequest();
    apiRequest.addEventListener("load", requestListener());
    apiRequest.open("GET", url);
    apiRequest.send();
  }

  // parses JSON document and returns data
  function requestListener() {
    return function() {
      let parsedDocument = JSON.parse(this.responseText);
      dataConverter(parsedDocument);
    };
  }

  // handles converting data from returned document
  function dataConverter(info) {
    // this is a link
    console.log(info);
    let currentUrl = info[typeSelected];
    console.log(currentUrl);  

    // if there is a results key in the object, this will trigger
    if (info.results) {
      console.log(working);
      // need to handle the multiple pages issue

      // pass in the correct array to the appropriate function

    // else it might be a movie title
    } else if (info[title] || info[name]) {
      return info[title] || info[name];

    // else it must be a link
    } else {
      retrieveAPI(currentUrl);
    }
  }

  // data is an array passed in the the dataConverter function
  // handles the 'person' option
  function getPerson(arr) {
    let nameElement = document.createElement('h2');
    let genderElement = document.createElement('p');
    let speciesElement = document.createElement('p');

    let name = arr[idSelected].name;
    let gender = arr[idSelected].gender;
    // this is a link
    let species = retrieveAPI(arr[idSelected].species);

  }

  // handles the 'planet' option
  function getPlanet(arr) {
    let nameElement = document.createElement('h2');
    let terrainElement = document.createElement('p');
    let populationElement = document.createElement('p');
    let filmList = document.createElement('ul');
    let filmsElement = document.createElement('li');

    let name = arr[idSelected].name;
    let terrain = arr[idSelected].terrain;
    let population = arr[idSelected].population;
    // this is a link
    let films = retrieveAPI(arr[idSelected].films);
  }

  // handles the 'starship' option
  function getStarship(arr) {
    let nameElement = document.createElement('h2');
    let manufacturerElement = document.createElement('p');
    let starshipClassElement = document.createElement('p');
    let filmsList = document.createElement('ul');
    let filmsElement = document.createElement('li');

    let name = arr[idSelected].name;
    let manufacturer = arr[idSelected].manufacturer;
    let starshipClass = arr[idSelected].starship_class;
    // this is a link
    let films = retrieveAPI(arr[idSelected].films);
  }

})();
