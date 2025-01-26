/* ###### First Colors Row ###### */
// extracts unique colors and displays them as buttons
function displayColors(data) {
  const colorSet = new Set(); // use Set to avoid duplicates

  // loop through and extract colors
  // data.forEach((row) => {
  //   if (row["Color"]) {
  //     const colors = row["Color"]
  //       .split(",") // splits by commas for multiple colors
  //       .map((color) => color.trim()) // Trim spaces
  //       .filter((color) => color.toLowerCase() !== "null" && color !== ""); // Skip NULL or empty values
  //     colors.forEach((color) => colorSet.add(color)); // Add each valid color to the Set
  //   }
  // });

  $.each(data, function (index, row) {
    if (row["Color"]) {
      // split, trim, filter, and add valid colors to the Set
      row["Color"]
        .split(",")
        .map($.trim) // jQ trim spaces method
        .filter((color) => color.toLowerCase() !== "null" && color !== "") // remove null and empty strings
        .forEach((color) => colorSet.add(color)); //adds to the Set()
    }
  });

  // clears color container and add buttons
  const $colorContainer = $(".color-select-container");
  $colorContainer.empty();

  if (colorSet.size === 0) {
    $colorContainer.append("<p>No colors available</p>");
  } 
  else {
    colorSet.forEach((color) => {
      // create button(s)
      const $button = $(`
        <button class="btn btn-sm btn-outline-success color-btn" border-color: #198754;">${color}</button>
      `);

      // on/off effect and filter
      $button.on("click", function () {
        $(".color-btn").removeClass("active"); // remove active class from all buttons
        $(this).addClass("active"); // add active class to the clicked button
        filterByColor(color);
      });

      $colorContainer.append($button);
    });
  }
}

/* ###### Second Colors Row ###### */
function displayRelatedColors(data, excludeColor) {
    const relatedColorSet = new Set();

    // loop through and extract related colors
    // data.forEach((row) => {
    //   if (row["Color"]) {
    //     const colors = row["Color"]
    //       .split(",") // Split by commas for multiple colors
    //       .map((color) => color.trim()) // Trim spaces
    //       .filter(
    //         (color) =>
    //           color.toLowerCase() !== "null" &&
    //           color !== "" &&
    //           color !== excludeColor // Exclude the selected color
    //       );
    //     colors.forEach((color) => relatedColorSet.add(color));
    //   }
    // });
    $.each(data, function (index, row) {
      if (row["Color"]) {
        // split, trim, and filter valid colors
        const colors = row["Color"]
          .split(",") // split by "," for multiple colors
          .map($.trim) // jQ trimmer
          .filter(function (color) {
            return (
              color.toLowerCase() !== "null" &&
              color !== "" &&
              color !== excludeColor // EXCLUDE unwanted colors
            );
          });

        // add color to the Set()
        $.each(colors, function (i, color) {
          relatedColorSet.add(color);
        });
      }
    });

    // clear box and add buttons(works dynamically)
    const $relatedColorContainer = $(".related-color-container");
    $relatedColorContainer.empty();

    if (relatedColorSet.size === 0) {
      $relatedColorContainer.append("<p>No related colors available</p>");
    } 
    else {
      relatedColorSet.forEach((color) => {
        const $button = $(
          `<button class="btn btn-sm btn-outline-success related-color-btn">${color}</button>`
        );

        // related color filtering
        $button.on("click", function () {
          $(".related-color-btn").removeClass("active");
          $(this).addClass("active");
          filterByColor(color); // func to filter by related color
        });

        $relatedColorContainer.append($button); // Add the button to the container
      });
    }
  }