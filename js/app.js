// jshint esversion:6
// DOCUMENT ARRAYS ARE SPLIT INTO PAGES
// if Id > 9 ...
console.log('Sanity Check: The Async Force Episode 2');
const sanity = "You're not insane!";

(function episodeTwo() {

  const resourceType = document.getElementById("resourceType");
  const resourceId = document.getElementById("resourceId");
  const requestResourceButton = document.getElementById("requestResourceButton");
  const contentContainer = document.getElementById('contentContainer');
  
  let typeSelected, idSelected;

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
      
      } else if (typeSelected === 'planets') {
        contentContainer.appendChild(generateDetailElement(results, 'terrain'));
        contentContainer.appendChild(generateDetailElement(results, 'population'));
        generateListElement(results, 'films');

      } else if (typeSelected === 'starships') {
        contentContainer.appendChild(generateDetailElement(results, 'manufacturer'));
        contentContainer.appendChild(generateDetailElement(results, 'starship_class'));
        generateListElement(results, 'films');
      }
    
    } else if (data.name) {
      contentContainer.appendChild(generateDetailElement(data));

    } else if (data.title) {
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
      detailElement = document.createElement('li');
      detailElement.innerHTML = data.title;
      console.log(detailElement);

    }

    return detailElement;
  }

  // passes in an array 'results' and the films array trait I suppose
  // films use 'title'
  // needs li tags wrapped in ul
  function generateListElement(data, trait) {
    let dataList = data[idSelected][trait];

    for (let i = 0; i < data.length; i++) {
      retrieveAPI(dataList[i]);
    }
  }

})(window);