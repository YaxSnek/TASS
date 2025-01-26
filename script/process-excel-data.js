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
        (additionalInfo ? " | " : "") + `<strong>Nape:</strong> ${row["Nape"]}`;
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
      if (!value || key === "Species" || value.toLowerCase() === "null") return;

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

window.processExcelData = processExcelData;