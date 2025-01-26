/* ###### Display Accordion ###### */
function displayAccordion(data) {
  const accordion = $("#accordionFlushExample").empty(); // Clear the accordion

  if (Object.keys(data).length === 0) {
    accordion.append(
      "<div class='no-results'>No snakes found for the selected country.</div>"
    );
    return;//shows message and exits if data is empty
  }

  let index = 0;
  $.each(data, function (species, details) {
    index++;
    const accordionId = `flush-collapse${index}`;
    const headerId = `flush-heading${index}`;
    const accordionItem = `
        <div class="accordion-item">
          <h2 class="accordion-header" id="${headerId}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionId}" aria-expanded="false" aria-controls="${accordionId}">
              ${species}
            </button>
          </h2>
          <div id="${accordionId}" class="accordion-collapse collapse" aria-labelledby="${headerId}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div style="display: flex; justify-content: center; gap: 10px;">
                    <div class="square">IMG_1</div>
                    <div class="square">IMG_2</div>
                    <div class="square">IMG_3</div>
                  </div>
              ${generateDetailsList(details)}
            </div>
          </div>
        </div>
      `;
    accordion.append(accordionItem);
  });
}
