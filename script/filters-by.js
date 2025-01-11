/* ###### Filter by country ###### */
function filterByCountry(data) {
  $(".country-select").on("change", function () {
    const selectedCountry = $(this).val(); //get country value
    const accordion = $("#accordionFlushExample");
    //show all if default value selected
    if (selectedCountry === "Filter by Country") {
      accordion.children().show();
      return; //stop!!!
    }

    accordion.children().each(function () {
      //loop through...
      //...get species name
      const species = $(this).find(".accordion-header button").text().trim();
      //if species exists in data...
      const details = data[species];
      let matches = false; //track if country matches

      //loop through details
      $.each(details, function (key, values) {
        //some() method checks if any value in the species details array contains the selected country.
        //https://www.w3schools.com/jsref/jsref_some.asp
        //if key is "Country" and values include selected country
        if (values.some((value) => value.includes(selectedCountry))) {
          matches = true; //set matches to true if country found
        }
      });

      if (matches) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
}

/* ###### Filter by snake name ###### */
function filterBySnakeName(data) {
  $("#exampleDataList").on("input", function () {
    //get input trimmed and lowercased
    const selectedSnake = $(this).val().trim().toLowerCase();
    const accordion = $("#accordionFlushExample");

    //selects all child elements of the accordion container (e.g., all accordion items).
    accordion.children().each(function () {
      const species = $(this)
        .find(".accordion-header button") //find the button element
        .text() //get the text content
        .trim()
        .toLowerCase();
      if (species === selectedSnake) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
}
