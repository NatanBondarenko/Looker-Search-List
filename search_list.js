looker.plugins.visualizations.add({
  options: {},
  create: function(element, config) {
    // Define the HTML code for the help sections
    const html = `
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search help topics..." oninput="searchHelp()">
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
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
