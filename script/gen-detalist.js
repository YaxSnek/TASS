function generateDetailsList(details) {
  var html = ""; //just a var:)

  $.each(details, function (key, values) {
    if (key === "Color") {
      //header for additional info
      html +=
        "<div style='text-align: center; font-weight: bold; margin-bottom: 10px;'>Additional Info:</div>";

      //format colors and details
      function formatDetails(value) {
        var colors, details;

        //if contains "(" -> split
        if (value.includes("(")) {
          var parts = value.split("(").map(function (part) {
            return part.trim(); //trim each part
          });
          colors = parts[0]; // First part - colors
          details = parts[1]; // Second part - details
        } 
        else {
          colors = value.trim(); //treat as colors
          details = ""; //nothing for details
        }

        //format colors (assuming capitalization is already handled in processExcelData)
        var formattedColors = colors
          .split(",")
          .map(function (color) {
            return color.trim(); //
          })
          .join(", ")
          .replace(/,\s*$/, ""); //remove trailing...

        //format additional details
        var formattedDetails = details
        //if details exist, format them
          ? details
              .replace(")", "") //remove trailing ")"
              .split("|") // Split into individual details
              .map(function (item) {
                return (
                  '<div style="margin-left: 20px;">' + item.trim() + "</div>"
                );
              })
              .join("") //join all
          //else, return empty string
          : "";

        //combine colors and details
        return (
          '<div class="color-item"><div>' +
          formattedColors +
          "</div>" +
          formattedDetails +
          "</div>"
        );
      }

      //combine first 3 colors and additional colors
      var initialColors = values.slice(0, 3).map(formatDetails).join("<hr>");
      var extraColors = values.slice(3).map(formatDetails).join("<hr>");

      html +=
        '<div class="color-details">' +
        initialColors +
        (extraColors
          ? '<hr><div class="additional-colors" style="display: none;">' +
            extraColors +
            "</div>"
          : "") +
        (extraColors
          ? '<button class="btn btn-link toggle-more">Show More</button>'
          : "") +
        "</div>";
    }

    //handle countries
    if (key === "Country") {
      html +=
        "<div style='text-align: center; font-weight: bold; margin-bottom: 10px;'>Countries:</div>";

      //combine and split countries
      var allCountries = values.join(",").split(",");
      var uniqueCountries = [];

      //remove duplicates and trim each country
      for (var i = 0; i < allCountries.length; i++) {
        var country = allCountries[i].trim(); //remove extra spaces
        uniqueCountries.push(country); //add to the list
      }
      uniqueCountries.sort();//sort alphabetically

      //string of countries separated by ", "
      var countriesString = uniqueCountries.join(", ");

      html += "<div class='country-details'>" + countriesString + "</div>";
    }
  });

  return html; //return combined html
}

/* ###### Toggle show/hide more colors ###### */
$(document).on("click", ".toggle-more", function () {
  var additionalSection = $(this)
    .closest(".color-details")//find the closest parent with class "color-details"
    .find(".additional-colors");//search within the parent for class "additional-colors"
  var isVisible = additionalSection.is(":visible");//check if the section is visible
  additionalSection.toggle();//toggle visibility
  $(this).text(isVisible ? "Show More" : "Show Less");//update button text
});
