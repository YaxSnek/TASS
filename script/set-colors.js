$(document).ready(function () {
  let snakesData = []; //full data storage

  //load JSON
  $.getJSON("11snakes.json", function (data) {
    snakesData = data;//save data(global)
    const uniqueColors = extractUniqueColors(data);
    setDropdown("#color1", uniqueColors);
    setDropdown("#color2", uniqueColors); 
  });

  function extractUniqueColors(data) {
    const colorSet = new Set(); //makes sure no color duplicates!
    data.forEach((row) => {
      if (row.Color) {//if color exists
        row.Color.split(",")//split by comma
          .map((color) => color.trim().toLowerCase())
          .forEach((color) => {
            if (color && color !== "null") {
              //exclude null, empty, or invalid values
              colorSet.add(color);
            }
          });
      }
    });
    //convert set to array and sort
    return Array.from(colorSet).sort();
  }

  function setDropdown(selector, colors) {
    const dropdown = $(selector).empty();//makes it nice and clean
    dropdown.append('<option selected value="">Filter by Color</option>');//default value
    colors.forEach((color) => {
      if (color) {
        //makes sure color is NOT null OR empty
        dropdown.append(
          `<option value="${color}">${capitalize(color)}</option>`
        );
      }
    });
  }

  //converts firts letter to uppercase while keeping the rest lowercase
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
