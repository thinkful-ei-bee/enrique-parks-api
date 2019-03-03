

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

    const url = `${searchURL}limit=${encodeURIComponent(maxResults)}&q=${encodeURIComponent(state)}&api_key=${encodeURIComponent(apiKey)}`;
  
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
 console.log(jsonObj);

  $('#results-list').empty();

  for (let x=0; x < jsonObj.data.length; x++ ){
    $('#results-list').append(
      `<li><h3>${jsonObj.data[x].fullName}</h3>
      <p>${jsonObj.data[x].description} Visit us here!<a href=${jsonObj.data[x].url}>${jsonObj.data[x].url}</a></p>
      </li>`
    )};
  
  $('#results').removeClass('hidden');
};

$(watchForm);