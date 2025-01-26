$(document).ready(function () {
  let originalData = {}; // original JSON data
  let snakesData = {}; // processed data
  let countryData = {}; // for color filtering
  let filteredDataColors = {}; // filtered data
  let filteredDataColorsII = {}; // farther filtered data

  /* ###### Load data from JSON ###### */
  $.getJSON("11snakes.json", function (jsonData) {
    originalData = jsonData; // save original data
    rawData = jsonData;

    // need this part for color filter to work
    originalData.forEach((row) => {
      if (row["Color"]) {
        row["Color"] = row["Color"].trim();
        if (!row["Color"].endsWith(",")) {
          row["Color"] += ","; // adds comma - filter works
        }
      }
    });

    displayColors(originalData);
    processExcelData(originalData);

    const uniqueCountries = getUniqueCountries(originalData);
    setCountryDropdown(uniqueCountries);
    processExcelData(originalData); // process and display all data
  });

  /* ###### Event For Selected Country ###### */
  $(".country-select").on("change", function () {
    const selectedCountry = $(this).val();

    if (selectedCountry === "Filter by Country") {
      // if country is not selected, reset and display all data
      // processExcelData(originalData);
      countryData = {};
      displayColors(cleanData(originalData));
      $("input").val("");
      $(".color-btn, .related-color-btn").removeClass("active");
      $(".related-color-container").empty();
      processExcelData(originalData);
    } else {
      // filter by the selected country
      // const filteredData = filterByCountry(originalData, selectedCountry);
      countryData = filterByCountry(originalData, selectedCountry);
      displayColors(cleanData(countryData));
      processExcelData(countryData); // process and display filtered data
    }
  });

  /* ###### First Color Filter ###### */
  $(document).on("click", ".color-btn", function () {
    $("input").val("");
    const selectedColor = $(this).text();

    // Use countryData if a country is selected, otherwise fallback to originalData
    const activeData =
      countryData && Object.keys(countryData).length > 0
        ? countryData
        : originalData;

    // filter, clean and display data
    filteredDataColors = filterByColor(activeData, selectedColor);
    filteredDataColors = cleanData(filteredDataColors);

    processExcelData(filteredDataColors);
    filteredDataColors = cleanData(filteredDataColors);

    displayRawData(filteredDataColors);
    displayRelatedColors(filteredDataColors, selectedColor);
  });

  /* ###### Second Color Filter ###### */
  $(document).on("click", ".related-color-btn", function () {
    const selectedColorII = $(this).text();

    // filter filtered and clean data
    filteredDataColorsII = filterByColor(filteredDataColors, selectedColorII);
    filteredDataColorsII = cleanData(filteredDataColorsII);

    // process and display filtered data
    processExcelData(filteredDataColorsII);
    filteredDataColorsII = cleanData(filteredDataColorsII);
    displayRawData(filteredDataColorsII);

    // in process...
    // displayRelatedColors(secondFilteredDataColors, selectedColorII);
  });

  //clean "Color" field
  function cleanData(data) {
    const cleanedData = [];
    $.each(data, function (index, row) {
      if (row["Color"]) {
        const pattern = /^[a-zA-Z\s,-]+/; // regular expression pattern
        // check if the "Color" value matches the pattern
        const match = row["Color"].match(pattern);
        // clean and update "Color" field
        if (match) {
          row["Color"] = match[0].trim();
        }
      }
      cleanedData.push(row); // add clened row
    });
    return cleanedData;
  }

  // ###### DATA TESTER ######
  function displayRawData(data) {
    const rawData = $("#raw-data-display");
    if (Object.keys(data).length === 0) {
      rawData.text("No data available");
    } else {
      rawData.text(JSON.stringify(data, null, 2)); // format and display JSON
    }
  }

  /* ###### Process Excel Data ###### */
  // function to process Excel data, structure it and display
  function processExcelData(data) {
    snakesData = {}; // reset data

    // loop through..
    // data.forEach(function (row) {
    //   const species = row["Species"] ? row["Species"].toString().trim() : "";
    //   if (!species || species.toLowerCase() === "null") return;

    //   if (!row["Color"] || row["Color"].toLowerCase() === "null") return;

    //   snakesData[species] = snakesData[species] || {};

    //   if (row["Color"] && row["Color"].toLowerCase() !== "null") {
    //     row["Color"] = row["Color"]
    //       .split(",")
    //       .map((color) => color.trim())
    //       .join(", ");
    //   }

    $.each(data, function (index, row) {
      // if True -> toString and trim, Else skip
      const species = row["Species"] ? $.trim(row["Species"].toString()) : "";

      if (!species || species.toLowerCase() === "null") {
        return;
      }

      // validate "Color"
      if (!row["Color"] || row["Color"].toLowerCase() === "null") {
        return;
      }

      // create or reuse entry in snakesData
      snakesData[species] = snakesData[species] || {};

      // trim and join colors with ","
      if (row["Color"]) {
        row["Color"] = $.map(row["Color"].split(","), function (color) {
          return $.trim(color);
        }).join(", ");
      }

      // for additional info
      let additionalInfo = "";

      // add caption if it exists
      if (row["Caption"] && row["Caption"].toLowerCase() !== "null") {
        additionalInfo += `<strong>Caption:</strong> ${row["Caption"]}`;
      }
      // add HeadColorDistinct if it exists
      if (
        row["HeadColorDistinct"] &&
        row["HeadColorDistinct"].toLowerCase() !== "null"
      ) {
        additionalInfo +=
          (additionalInfo ? " | " : "") +
          `<strong>HeadColor:</strong> ${row["HeadColorDistinct"]}`;
      }
      // add ScaleType if it exists
      if (row["ScaleType"] && row["ScaleType"].toLowerCase() !== "null") {
        additionalInfo +=
          (additionalInfo ? " | " : "") +
          `<strong>Scale:</strong> ${row["ScaleType"]}`;
      }
      // add Nape if it exists
      if (row["Nape"] && row["Nape"].toLowerCase() !== "null") {
        additionalInfo +=
          (additionalInfo ? " | " : "") +
          `<strong>Nape:</strong> ${row["Nape"]}`;
      }
      // add Pattern if it exists
      if (row["Pattern"] && row["Pattern"].toLowerCase() !== "null") {
        additionalInfo +=
          (additionalInfo ? " | " : "") +
          `<strong>Pattern:</strong> ${row["Pattern"]}`;
      }
      // add VentralColor if it exists
      if (row["VentralColor"] && row["VentralColor"].toLowerCase() !== "null") {
        additionalInfo +=
          (additionalInfo ? " | " : "") +
          `<strong>VentralColor:</strong> ${row["VentralColor"]}`;
      }
      // add VentralPattern if it exists
      if (
        row["VentralPattern"] &&
        row["VentralPattern"].toLowerCase() !== "null"
      ) {
        additionalInfo +=
          (additionalInfo ? " | " : "") +
          `<strong>VentralPattern:</strong> ${row["VentralPattern"]}`;
      }
      // add additionalInfo to the Color column or display "No info"
      if (additionalInfo) {
        row["Color"] = `${row["Color"]} (${additionalInfo})`;
      } else {
        row["Color"] = `${row["Color"]} (No info)`;
      }

      /* adds all valid data fields (except "Species") to their respective keys
      under the species in snakesData */
      $.each(row, function (key, value) {
        if (!value || key === "Species" || value.toLowerCase() === "null")
          return;

        const trimmedValue = value.toString().trim();

        if (!snakesData[species][key]) {
          // if key doesn't exist, create it as an empty array
          snakesData[species][key] = [];
        }

        if (!snakesData[species][key].includes(trimmedValue)) {
          // add value if it's not alredy there
          snakesData[species][key].push(trimmedValue);
        }
      });
    });

    // populate dropdowns and update accordion
    var snakeNames = Object.keys(snakesData);
    setDatalist(snakeNames);
    filterBySnakeName(snakesData);
    displayAccordion(snakesData);
  }

  /* ###### Reset Everything ###### */
  $("#reset-button").on("click", function () {
    // clear inputs and dropdowns, reset buttons
    $("input").val("");
    $("select").val("Filter by Country");
    $(".color-btn, .related-color-btn").removeClass("active");

    // reload original data
    $.getJSON("11snakes.json", function (jsonData) {
      originalData = jsonData; // same as in the beginning...

      //...continue
      originalData.forEach((row) => {
        if (row["Color"]) {
          row["Color"] = row["Color"].trim();
          if (!row["Color"].endsWith(",")) {
            row["Color"] += ",";
          }
        }
      });
      processExcelData(originalData);
      displayColors(cleanData(originalData));
      // const uniqueCountries = getUniqueCountries(originalData);
      // setCountryDropdown(uniqueCountries);
    });
    $(".related-color-container").empty();
  });

  $("#exampleDataList").on("click", function () {
    $("input").val("");
    $("select").val("Filter by Country");
    $(".color-btn, .related-color-btn").removeClass("active");
    $(".related-color-container").empty();
    processExcelData(originalData);
  });

  $(".country-select").on("click", function () {
    $("#exampleDataList").val("");
    $(".color-btn, .related-color-btn").removeClass("active");
    $(".related-color-container").empty();
  });
});
