looker.plugins.visualizations.add({
  options: {},
  create: function(element, config) {
    // Define the HTML code for the help sections
    const html = `
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search help topics...">
      </div>
      
      <div class="help-section">
        <div class="help-section-header" onclick="toggleSection('section1')">
          Offers Analysis
        </div>
        <div class="help-section-content" id="section1">
          <p>Offers Analysis includes all offers generated for application - Don't support latest offer!</p>
        </div>
      </div>
      
      <div class="help-section">
        <div class="help-section-header" onclick="toggleSection('section2')">
          Flow Analysis (Latest Offer)
        </div>
        <div class="help-section-content" id="section2">
          <p>Production data: from applications to loans</p>
        </div>
      </div>
    `;
    
    // Set the HTML content of the element
    element.innerHTML = html;
    
    // Add event listeners for toggleSection and searchHelp functions
    element.querySelector("#searchInput").addEventListener("input", searchHelp);
    
    const sectionHeaders = element.querySelectorAll(".help-section-header");
    sectionHeaders.forEach(function(header) {
      header.addEventListener("click", function() {
        const sectionId = this.getAttribute("onclick").match(/toggleSection\('(.*)'\)/)[1];
        const content = element.querySelector("#" + sectionId);
        if (content.style.display === "none") {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
