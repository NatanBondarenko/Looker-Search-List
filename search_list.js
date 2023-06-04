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

    // Create the help sections
    const helpSections = [];

    // Function to toggle section visibility
    function toggleSection(sectionId) {
      const content = document.getElementById(sectionId);
      if (content.style.display === 'none') {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    }

    // Function to perform search on help topics
    function searchHelp() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const sections = document.getElementsByClassName('help-section');

      for (let i = 0; i < sections.length; i++) {
        const content = sections[i].getElementsByClassName('help-section-content')[0];
        const matches = content.innerText.toLowerCase().includes(input);

        if (matches) {
          sections[i].style.display = 'block';
        } else {
          sections[i].style.display = 'none';
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

      const sectionContainer = document.createElement('div');
      sectionContainer.classList.add('help-section');

      const sectionHeader = document.createElement('div');
      sectionHeader.classList.add('help-section-header');
      sectionHeader.textContent = sectionData.header;
      sectionHeader.addEventListener('click', () => toggleSection(sectionId));

      const sectionContent = document.createElement('div');
      sectionContent.classList.add('help-section-content');
      sectionContent.id = sectionId;
      sectionContent.textContent = sectionData.description;

      sectionContainer.appendChild(sectionHeader);
      sectionContainer.appendChild(sectionContent);

      helpSections.push(sectionContainer);
    });

    // Append the elements to the visualization container
    element.appendChild(searchBar);
    helpSections.forEach(section => element.appendChild(section));
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});

looker.plugins.visualizations.add({
  options: {
    css_style: {
      type: 'string',
      label: 'CSS Style',
      default: `
        .help-section {
          border: 1px solid #ddd;
          margin-bottom: 10px;
        }

        .help-section-header {
          background-color: #f2f2f2;
          padding: 10px;
          cursor: pointer;
        }

        .help-section-content {
          padding: 10px;
          display: none;
        }

        .help-section-content p {
          margin: 0;
        }

        .search-bar {
          margin-bottom: 10px;
        }
      `
    }
  },
  create: function(element, config) {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = config.css_style;
    element.appendChild(styleTag);
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
