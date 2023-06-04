looker.plugins.visualizations.add({
  options: {
    helpSectionData: {
      section1: {
        header: {
          type: "string",
          label: "Header"
        },
        description: {
          type: "string",
          label: "Description"
        }
      }
    }
  },
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

    // Create the help sections container
    const helpSectionsContainer = document.createElement('div');
    helpSectionsContainer.classList.add('help-sections-container');

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

    // Function to add help sections from the options data
    function addHelpSectionsFromOptions() {
      const sectionKeys = Object.keys(config.helpSectionData);

      sectionKeys.forEach(sectionKey => {
        const sectionData = config.helpSectionData[sectionKey];
        const header = sectionData.header;
        const description = sectionData.description;

        if (header && description) {
          addHelpSection(header, description);
        }
      });
    }

    // Function to add a new help section
    function addHelpSection(header, description) {
      const sectionId = `section${helpSectionsContainer.childElementCount + 1}`;

      const sectionContainer = document.createElement('div');
      sectionContainer.classList.add('help-section');

      const sectionHeader = document.createElement('div');
      sectionHeader.classList.add('help-section-header');
      sectionHeader.textContent = header;
      sectionHeader.addEventListener('click', () => toggleSection(sectionId));

      const sectionContent = document.createElement('div');
      sectionContent.classList.add('help-section-content');
      sectionContent.id = sectionId;
      sectionContent.textContent = description;

      sectionContainer.appendChild(sectionHeader);
      sectionContainer.appendChild(sectionContent);

      helpSectionsContainer.appendChild(sectionContainer);
    }

    // Generate the initial help sections from the options data
    function addHelpSectionsFromOptions() {
  const sectionKeys = Object.keys(config.helpSectionData);

  console.log('Section Keys:', sectionKeys); // Log the section keys

  sectionKeys.forEach(sectionKey => {
    const sectionData = config.helpSectionData[sectionKey];
    const header = sectionData.header;
    const description = sectionData.description;

    console.log('Header:', header); // Log the header
    console.log('Description:', description); // Log the description

    if (header && description) {
      addHelpSection(header, description);
    }
  });
}

    // Append the elements to the visualization container
    element.appendChild(searchBar);
    element.appendChild(helpSectionsContainer);
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
