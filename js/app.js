// jshint esversion:6

console.log('Sanity Check: The Async Force Episode 2');

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
  // passes in the type and id selected to requestListener
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
      console.log(parsedDocument);
      dataConverter(parsedDocument);
    };
  }

  // handles converting data from returned document
  function dataConverter(document) {
    console.log(document[typeSelected]);
    retrieveAPI(document[typeSelected]);
  }

})();
