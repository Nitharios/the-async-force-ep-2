// jshint esversion:6

console.log('Sanity Check: The Async Force Episode 2');

(function episodeTwo() {
  const allOptions = document.getElementsByTagName("option");
  console.log(allOptions);
  const resourceType = document.getElementById("resourceType");

  const resourceListener = addEventListener("load", resourceSelector());

  // selects the option taken by user
  resourceSelector = () => {
    let optionSelected = document.getElementById("resourceType").value;
    console.log(optionSelected);
  };
  

  // () => {};

})();
