
// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.


'use strict';

const apiKey = 'oOlHWV6kIeyptpALBLHVwe9Hf8MDq8kwhRgOyVcM'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const state = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      console.log(state, maxResults)
      getParks(state, maxResults);
    });
  }

  function getParks(state, maxResults=10) {
    const url = `${searchURL}limit=${maxResults}&q=${state}&api_key=${apiKey}`;
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(jsonObj => displayResults(jsonObj))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function displayResults(jsonObj) {
 
  $('#results-list').empty();
  for (var x in jsonObj.data){
    $('#results-list').append(
      `<li><h3>${jsonObj.data[x].fullName}</h3>
      <p>${jsonObj.data[x].description} Visit us here!<a href=${jsonObj.data[x].url}>${jsonObj.data[x].url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

$(watchForm);