/* ###### Generate details list ###### */
function generateDetailsList(details) {
  let html = "";
  //loop through each key/value
  $.each(details, function (key, values) {
    //format values
    const formattedValues = values.map((value) => {
      //split by comma, trim
      const items = value.split(",").map((item) => item.trim());
      const cleanedItems = items.map((item) => {
        //split by space to read each word
        const words = item.split(" ").map((word) => {
          if (word.startsWith("(")) {
            //if word starts with "("...
            //...capitalize second letter and convert the rest to lowercase
            return `(${word.charAt(1).toUpperCase()}${word
              .slice(2)
              .toLowerCase()}`;
          }
          //otherwise, capitalize first letter and convert the rest to lowercase
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return words.join(" "); //join words using space
      });
      return cleanedItems.join(", "); //join with comma
    });

    /* ###### Generate color variations ###### */
    //if key = color
    if (key === "Color") {
      //add header for color variations
      html += `<div style='text-align: center; font-weight: bold; margin-bottom: 10px;'>Color Variations:</div>`;
      //shows first 3 colors(lines)...
      const initialColors = formattedValues
        .slice(0, 3)
        .map((value) => `<div>${value}</div>`)
        .join("<hr>");
      //...and the rest(lines)
      const additionalColors = formattedValues
        .slice(3)
        .map((value) => `<div>${value}</div>`)
        .join("<hr>");

      if (formattedValues.length > 3) {
        //toggle button(colors)
        html += `
                    <div class="color-details">
                        ${initialColors}
                        <hr>
                        <div class="additional-colors" style="display: none;">
                            ${additionalColors}
                        </div>
                        <button class="btn btn-link toggle-more">Show More</button>
                    </div>
                `;
      } else {
        //hides button if > 3 colors
        html += `<div class="color-details">${initialColors}</div>`;
      }
    } else {
      //if/else for codee name
      let separator;
      if (key === "Coder (Name)") {
        separator = ", ";
      } else {
        separator = "<strong> | </strong>";
      }
      html += `<div><strong>${key}:</strong> ${formattedValues.join(
        separator
      )}</div>`;
    }
  });

  return html; //completed HTML
}
/* ###### Generate details list(toggle) ######*/
$(document).on("click", ".toggle-more", function () {
  //get closest element ("color-details")
  const parent = $(this).closest(".color-details");
  //if additional colors are visible...
  const additionalSection = parent.find(".additional-colors");
  const isVisible = additionalSection.is(":visible");

  additionalSection.toggle(); //toggle additional colors
  $(this).text(isVisible ? "Show More" : "Show Less"); //change button text
});
