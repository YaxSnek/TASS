/* ###### Get unique countries from json ###### */
function getUniqueCountries(data) {
  const uniqueCountries = []; // Array to store unique countries
  $.each(data, function (index, row) {
    if (row["Country"]) {
      const countries = row["Country"].split(",");
      $.each(countries, function (i, country) {
        const trimmedCountry = $.trim(country);
        //if country is not in the list, add it
        if (uniqueCountries.indexOf(trimmedCountry) === -1) {
          uniqueCountries.push(trimmedCountry);
        }
      });
    }
  });
  return uniqueCountries;
}

/* ###### Set country dropdown ###### */
/* function setCountryDropdown(countries) {
  //pass uniqueCountries
  const countrySelect = $(".country-select").empty(); //empty <select>
  //add default option
  countrySelect.append("<option selected>Filter by Country</option>");
  countries.sort(); //sort countries alphabetically
  countries.forEach((country) => {
    //loop through countries...
    //...and add to <select>
    countrySelect.append(`<option value="${country}">${country}</option>`);
  });
} */

function setCountryDropdown(countries) {
  const countrySelect = $(".country-select").empty();
  countrySelect.append("<option selected>Filter by Country</option>");
  countries.sort(); //sort alphabetically
  $.each(countries, function (index, country) {
    countrySelect.append(
      '<option value="' + country + '">' + country + "</option>"
    );
  });
}

/* ###### Set snakes datalist ###### */
/* function setDatalist(snakes) {
  //pass snake names
  //empty datalist(in case of previous data)
  const datalist = $("#datalistOptions").empty();
  snakes.sort(); //sort snake names alphabetically
  snakes.forEach((snake) => {
    //loop through snake names...
    //...and add to datalist
    datalist.append(`<option value="${snake}"></option>`);
  });
} */

function setDatalist(snakes) {
  const datalist = $("#datalistOptions").empty();
  snakes.sort(); //sort alphabetically
  $.each(snakes, function (index, snake) {
    datalist.append('<option value="' + snake + '"></option>');
  });
}
