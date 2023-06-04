looker.plugins.visualizations.add({
  options: {
    sections: {
      type: 'array',
      label: 'Sections',
      section: 'Content',
      display: 'table',
      default: [],
      order: 1,
      rows: {
        header: {
          type: 'string',
          label: 'Header',
        },
        description: {
          type: 'string',
          label: 'Description',
        },
      },
    },
  },
  create: function(element, config) {
    // Create the help section elements
    const helpSections = [];

    // Add click event listener to toggle visibility
    function toggleSection(sectionId) {
      const content = document.getElementById(sectionId);
      if (content.style.display === 'none') {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    }

    // Generate the help section HTML dynamically based on options
    config.sections.forEach((section, index) => {
      const sectionId = `section${index + 1}`;

      const sectionContainer = document.createElement('div');
      sectionContainer.classList.add('help-section');

      const sectionHeader = document.createElement('div');
      sectionHeader.classList.add('help-section-header');
      sectionHeader.textContent = section.header;
      sectionHeader.addEventListener('click', () => toggleSection(sectionId));

      const sectionContent = document.createElement('div');
      sectionContent.classList.add('help-section-content');
      sectionContent.id = sectionId;
      sectionContent.textContent = section.description;

      sectionContainer.appendChild(sectionHeader);
      sectionContainer.appendChild(sectionContent);

      helpSections.push(sectionContainer);
    });

    // Append the help sections to the element
    helpSections.forEach(section => element.appendChild(section));
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
