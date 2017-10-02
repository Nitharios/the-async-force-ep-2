// jshint esversion:6
// DOCUMENT ARRAYS ARE SPLIT INTO PAGES
// if Id > 9 ...
console.log('Sanity Check: The Async Force Episode 2');
const working = 'It works!';

(function episodeTwo() {

  const resourceType = document.getElementById("resourceType");
  const resourceId = document.getElementById("resourceId");
  const requestResourceButton = document.getElementById("requestResourceButton");
  const contentContainer = document.getElementById('contentContainer');
  
  let typeSelected, 
      idSelected;

  ///// ASYNC HANDLING FUNCTIONS /////

  // resourceType.addEventListener("change", resourceSelector);
  requestResourceButton.addEventListener("click", resourceSelector);

  // selects the option taken by user
  function resourceSelector() {
    contentContainer.innerHTML = '';
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
  function requestListener() { // this is the event handler
    return function() {
      let parsedDocument = JSON.parse(this.responseText);
      console.log('parsed:', parsedDocument);

      // if the document has the typeSelected links, it needs to be re-passed through requestListener
      if (parsedDocument.results || parsedDocument.name || parsedDocument.title) {
        informationSorter(parsedDocument);
      
      } else {
        retrieveAPI(parsedDocument[typeSelected]);

      }
    };
  }

  ///// SYNC HANDLING FUNCTIONS //////

  // 
  function informationSorter(data) {
    // if the data has a results key, it must contain the name data
    if (data.results) {
      let results = data.results;
      contentContainer.appendChild(generateNameElement(results, 'name'));

      if (typeSelected === "people") {      
        contentContainer.appendChild(generateDetailElement(results, 'gender'));
        retrieveAPI(results[idSelected].species);
      }
    
    } else if (data.name) {
      contentContainer.appendChild(generateDetailElement(data));

    }
  }

  //
  function generateNameElement(data, trait) {
    let nameElement = document.createElement('h2');

    nameElement.class = trait;
    nameElement.innerHTML = data[idSelected][trait];
    return nameElement;    
  }

  // details are placed in a p tag
  // gender is in the same array as name
  // species is an array of links --> array.species[0];
  function generateDetailElement(data, trait) {
    let detailElement = document.createElement('p');
    detailElement.class = trait;

    if (data[idSelected]) {
      let detail = data[idSelected][trait];
      detailElement.innerHTML = data[idSelected][trait];

    } else if (data.name) {
      detailElement.innerHTML = data.name;

    } else if (data.title) {
      detailElement.innerHTML = data.title;
    
    }

    return detailElement;
  }

})(window);

/*  // handles converting data from returned document
  function dataConverter(datafile) {
    // this is a link
    console.log(datafile);
    let currentUrl = datafile[typeSelected];
    console.log('url', currentUrl);  

    // if there is a results key in the object, this will trigger
    if (datafile.results) {
      let results = datafile.results;

      console.log('requested:', results[idSelected].name);
      contentContainer.appendChild(generateName(results));
      contentContainer.appendChild(generateDetails(results, 'gender'));
      contentContainer.appendChild(generateDetails(results, 'species'));

      // need to handle the multiple pages issue

      // pass in the correct array to the appropriate function

    // else it might be a movie title or species name
    } else if (datafile.title || datafile.name) {
      console.log(datafile.title || 'not title!');
      console.log(datafile.name || 'not name!');

      return datafile.name;

    // else it must be a link
    } else {
      retrieveAPI(currentUrl);
    }
  }

  // data is passed in as an array
  // all name tags will appear in an h2 tag
  function generateName(array) {
    let nameElement = document.createElement('h2');

    nameElement.class = 'name';
    nameElement.innerHTML = array[idSelected].name;
    return nameElement;
  }

  // details are placed in a p tag
  // gender is in the same array as name
  // species is an array of links --> array.species[0];
  function generateDetails(array, trait) {
    let detail = array[idSelected][trait];
    console.log('detail: ', detail);
    let detailElement = document.createElement('p');
    
    if (!trait) {
      return 'No trait specified';
    // if this else if triggers the detail must be a url
    } else if (Array.isArray(detail)) {
      console.log('hit', detail[0]);
      // this is failing because of async...
      // the async is called but the appendChild method is running sync
      detailElement.class = trait;
      detailElement.innerHTML = retrieveAPI(detail[0]);
      return detailElement;

    } else {
      detailElement.class = trait;
      detailElement.innerHTML = detail;
      return detailElement;
    } 
  }*/

  // handles the 'person' option
  // function getPerson(arr) {
  //   let nameElement = document.createElement('h2');
  //   let genderElement = document.createElement('p');
  //   let speciesElement = document.createElement('p');

  //   let name = arr[idSelected].name;
  //   let gender = arr[idSelected].gender;
  //   // this is a link
  //   let species = retrieveAPI(arr[idSelected].species);

  // }
  // // handles the 'planet' option
  // function getPlanet(arr) {
  //   let nameElement = document.createElement('h2');
  //   let terrainElement = document.createElement('p');
  //   let populationElement = document.createElement('p');
  //   let filmList = document.createElement('ul');
  //   let filmsElement = document.createElement('li');

  //   let name = arr[idSelected].name;
  //   let terrain = arr[idSelected].terrain;
  //   let population = arr[idSelected].population;
  //   // this is a link
  //   let films = retrieveAPI(arr[idSelected].films);
  // }

  // // handles the 'starship' option
  // function getStarship(arr) {
  //   let nameElement = document.createElement('h2');
  //   let manufacturerElement = document.createElement('p');
  //   let starshipClassElement = document.createElement('p');
  //   let filmsList = document.createElement('ul');
  //   let filmsElement = document.createElement('li');

  //   let name = arr[idSelected].name;
  //   let manufacturer = arr[idSelected].manufacturer;
  //   let starshipClass = arr[idSelected].starship_class;
  //   // this is a link
  //   let films = retrieveAPI(arr[idSelected].films);
  //   console.log(films);
  // }
