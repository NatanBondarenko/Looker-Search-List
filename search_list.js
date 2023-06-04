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

    // Generate the initial help sections from the provided data
    const helpSectionData = [
      {
        header: 'Offers Analysis',
        description: 'Offers Analysis includes all offers generated for the application. Note: This version does not support the latest offer!',
      },
      {
        header: 'Flow Analysis (Latest Offer)',
        description: 'Production data: from applications to loans',
      },
      // Add more help sections as needed
    ];

    helpSectionData.forEach(sectionData => {
      addHelpSection(sectionData.header, sectionData.description);
    });

    // Create the form for adding new help sections
    const addSectionForm = document.createElement('form');
    addSectionForm.classList.add('add-section-form');

    const headerInput = document.createElement('input');
    headerInput.setAttribute('type', 'text');
    headerInput.setAttribute('placeholder', 'Header');
    addSectionForm.appendChild(headerInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('placeholder', 'Description');
    addSectionForm.appendChild(descriptionInput);

    const addButton = document.createElement('button');
    addButton.setAttribute('type', 'button');
    addButton.textContent = 'Add Section';
    addButton.addEventListener('click', () => {
      const header = headerInput.value;
      const description = descriptionInput.value;
      if (header && description) {
        addHelpSection(header, description);
        headerInput.value = '';
        descriptionInput.value = '';
      }
    });
    addSectionForm.appendChild(addButton);

    // Append the elements to the visualization container
    element.appendChild(searchBar);
    element.appendChild(helpSectionsContainer);
    element.appendChild(addSectionForm);
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
