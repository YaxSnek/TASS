/* ###### Filter by snake name ###### */
function filterBySnakeName(data) {
  $("#exampleDataList").on("input", function () {
    //get input trimmed and lowercased
    const selectedSnake = $(this).val().trim().toLowerCase();
    const accordion = $("#accordionFlushExample");

    //go through each child element of the accordion container(e.g. accordion items)
    accordion.children().each(function () {
      //get`Species` name (accordion title)
      const species = $(this)
        .find(".accordion-header button")
        .text()
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

/* ###### Filter Data by Country ###### */
// function filterByCountry(data, selectedCountry) {
//   return data.filter((row) => {
//     if (row["Country"]) {
//       const countries = row["Country"].split(",").map((c) => c.trim());
//       return countries.includes(selectedCountry); // Keep rows with matching country
//     }
//     return false; // Exclude rows without a "Country" field
//   });
// }

function filterByCountry(data, selectedCountry) {
  const filteredData = []; // matching data list

  $.each(data, function (index, row) {
    if (row["Country"]) {
      //check if "Country" exists
      const countries = row["Country"].split(","); //splits into array
      const trimmedCountries = [];

      $.each(countries, function (i, c) {
        trimmedCountries.push($.trim(c));
      });

      if (trimmedCountries.includes(selectedCountry)) {
        filteredData.push(row); //add to the list
      }
    }
  });
  return filteredData;
}

/* ###### Filter Data by Color ###### */
function filterByColor(data, selectedColor) {
  const filteredData = [];
  $.each(data, function (index, row) {
    if (row["Color"]) {
      const colors = row["Color"].split(",");
      const trimmedColors = [];

      $.each(colors, function (i, c) {
        trimmedColors.push($.trim(c.toLowerCase()));
      });

      if (trimmedColors.includes(selectedColor.toLowerCase())) {
        filteredData.push(row); //add matching row
      }
    }
  });

  return filteredData; //return filtered data
}
