// jshint esversion:6
// DOCUMENT ARRAYS ARE SPLIT INTO PAGES
// if Id > 9 ...
console.log('Sanity Check: The Async Force Episode 2');
const sanity = "You're not insane!";

(function episodeTwo() {

  window.addEventListener('error', function() {
    invalidInput();
  }, true);

  const resourceType = document.getElementById("resourceType");
  const resourceId = document.getElementById("resourceId");
  const requestResourceButton = document.getElementById("requestResourceButton");
  const contentContainer = document.getElementById('contentContainer');
  const unorderedListElement = document.createElement('ul');
  
  let typeSelected, idSelected, uniqueValue, pageNumber;

  ///// ASYNC HANDLING FUNCTIONS /////

  // resourceType.addEventListener("change", resourceSelector);
  requestResourceButton.addEventListener("click", resourceSelector);

  // selects the option taken by user
  function resourceSelector() {
    contentContainer.innerHTML = '';
    pageNumber = undefined;

    typeSelected = document.getElementById("resourceType").value;
    idSelected = document.getElementById("resourceId").value;
    uniqueValue = idSelected;

    if (!isNaN(idSelected)) {
      idSelected -= 1;
  
      if (idSelected >= 10) {
        pageNumber = Math.floor(idSelected / 10) + 1;
        idSelected %= 10;
      }
    }
    
    retrieveAPI("https://swapi.co/api/");
  }

  // opens the request for the data from the provided URL
  function retrieveAPI(url) {
    let apiRequest = new XMLHttpRequest();
    apiRequest.addEventListener("load", requestListener(url));
    apiRequest.open("GET", url);
    apiRequest.send();
  }

  // parses JSON document and returns data
  function requestListener(url) { // this is the event handler
    return function() {
      if (this.status === 404) {
        invalidInput();
        return 'ERROR!';
      }

      let parsedDocument = JSON.parse(this.responseText);
      console.log('parsed:', parsedDocument);

      // if the document has the typeSelected links, it needs to be re-passed through requestListener
      if (parsedDocument.results || parsedDocument.name || parsedDocument.title) {
        informationSorter(parsedDocument);
      
      } else {

        if (pageNumber) retrieveAPI(parsedDocument[typeSelected] + `?page=${pageNumber}`);
        else retrieveAPI(parsedDocument[typeSelected]);

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

        unorderedListElement.innerHTML = '';
        generateListElement(results, 'films');
        contentContainer.appendChild(unorderedListElement);

      } else if (typeSelected === 'starships') {
        contentContainer.appendChild(generateDetailElement(results, 'manufacturer'));
        contentContainer.appendChild(generateDetailElement(results, 'starship_class'));

        unorderedListElement.innerHTML = '';
        generateListElement(results, 'films');
        contentContainer.appendChild(unorderedListElement);
      }
    
    } else if (data.name) {
      contentContainer.appendChild(generateDetailElement(data));

    } else if (data.title) {
      unorderedListElement.appendChild(generateDetailElement(data));

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

    }

    return detailElement;
  }

  // passes in an array 'results' and the films array trait I suppose
  // films use 'title'
  // needs li tags wrapped in ul
  function generateListElement(data, trait) {
    let dataList = data[idSelected][trait];

    for (let i = 0; i < dataList.length; i++) {
      retrieveAPI(dataList[i]);

    }
  }

  ///// ERROR HANDLING FUNCTION /////
  
  function invalidInput() {
    errorElement = document.createElement('div');
    errorElement.style.backgroundColor = '#E30022';
    errorElement.innerHTML = `ERROR! https://swapi.co/api/${typeSelected}/${uniqueValue} NOT FOUND!`;
    contentContainer.appendChild(errorElement);
  }

})(window);