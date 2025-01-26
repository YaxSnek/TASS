/* ###### First Color Filter ###### */
$(document).on("click", ".color-btn", function () {
  const selectedColor = $(this).text();

  // filter and clean data
  filteredDataColors = filterByColor(originalData, selectedColor);
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
