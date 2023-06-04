looker.plugins.visualizations.add({
  options: {
    headers: {
      type: 'array',
      label: 'Headers',
      display: 'string',
      section: 'Content',
      default: [],
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
    config.headers.forEach((header, index) => {
      const sectionId = `section${index + 1}`;

      const section = document.createElement('div');
      section.classList.add('help-section');

      const sectionHeader = document.createElement('div');
      sectionHeader.classList.add('help-section-header');
      sectionHeader.textContent = header;
      sectionHeader.addEventListener('click', () => toggleSection(sectionId));

      const sectionContent = document.createElement('div');
      sectionContent.classList.add('help-section-content');
      sectionContent.id = sectionId;

      section.appendChild(sectionHeader);
      section.appendChild(sectionContent);

      helpSections.push(section);
    });

    // Append the help sections to the element
    helpSections.forEach(section => element.appendChild(section));
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
