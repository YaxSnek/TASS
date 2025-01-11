/* ###### Get unique countries from data ###### */
function getUniqueCountries(data) {
  const uniqueCountries = []; //store unique countries
  data.forEach((row) => {
    if (row["Country"]) {
      //if country exists
      //split by comma, trim and add to unique countries[]
      const countries = row["Country"]
        .split(",")
        .map((country) => country.trim());
      countries.forEach((country) => {
        //loop through countries
        if (!uniqueCountries.includes(country)) {
          //if country not in unique countries
          uniqueCountries.push(country); //add to unique countries
        }
      });
    }
  });
  return uniqueCountries; //return unique countries[data]
}
/* ###### Set country dropdown ###### */
function setCountryDropdown(countries) {
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
}
/* ###### Set snakes datalist ###### */
function setDatalist(snakes) {
  //pass snake names
  //empty datalist(in case of previous data)
  const datalist = $("#datalistOptions").empty();
  snakes.sort(); //sort snake names alphabetically
  snakes.forEach((snake) => {
    //loop through snake names...
    //...and add to datalist
    datalist.append(`<option value="${snake}"></option>`);
  });
}
