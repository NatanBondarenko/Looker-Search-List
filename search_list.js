looker.plugins.visualizations.add({
  options: {},
  create: function(element, config) {
    // Create the search bar
    const searchBar = document.createElement('div');
    searchBar.classList.add('search-bar');

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('id', 'searchInput');
    searchInput.setAttribute('placeholder', 'Search help topics...');
    searchInput.addEventListener('input', searchHelp);

    searchBar.appendChild(searchInput);

    // Create the help table
    const helpTable = document.createElement('table');
    helpTable.classList.add('help-table');

    // Function to perform search on help topics
    function searchHelp() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const rows = helpTable.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        const content = rows[i].getElementsByClassName('help-section-content')[0];
        const matches = content.innerText.toLowerCase().includes(input);

        if (matches) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    }

    // Generate the help section HTML dynamically
    const helpSectionData = [
      {
        header: 'Offers Analysis',
        description: 'Offers Analysis includes all offers generated for application - Don\'t support latest offer!',
      },
      {
        header: 'Flow Analysis (Latest Offer)',
        description: 'Production data: from applications to loans',
      },
      // Add more help sections as needed
    ];

    helpSectionData.forEach((sectionData, index) => {
      const sectionId = `section${index + 1}`;

      const row = document.createElement('tr');

      const headerCell = document.createElement('td');
      headerCell.classList.add('help-section-header');
      headerCell.textContent = sectionData.header;
      headerCell.addEventListener('click', () => toggleSection(sectionId));

      const contentCell = document.createElement('td');
      contentCell.classList.add('help-section-content');
      contentCell.id = sectionId;
      contentCell.textContent = sectionData.description;

      row.appendChild(headerCell);
      row.appendChild(contentCell);

      helpTable.appendChild(row);
    });

    // Append the elements to the visualization container
    element.appendChild(searchBar);
    element.appendChild(helpTable);
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
