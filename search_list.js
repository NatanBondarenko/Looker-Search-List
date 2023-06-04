looker.plugins.visualizations.add({
  options: {},
  create: function(element, config) {
    // Define the help sections as an array of objects
    const helpSections = [
      {
        title: 'Offers Analysis',
        content: 'Offers Analysis includes all offers generated for application - Don\'t support latest offer!',
      },
      {
        title: 'Flow Analysis (Latest Offer)',
        content: 'Production data: from applications to loans',
      },
      // Add more help sections as needed
    ];

    // Create the list structure for help sections
    const list = document.createElement('ul');
    list.classList.add('help-list');

    helpSections.forEach((section, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('help-section');

      const header = document.createElement('div');
      header.classList.add('help-section-header');
      header.textContent = section.title;

      const content = document.createElement('div');
      content.classList.add('help-section-content');
      content.textContent = section.content;

      listItem.appendChild(header);
      listItem.appendChild(content);

      listItem.addEventListener('click', function() {
        this.classList.toggle('active');
      });

      list.appendChild(listItem);
    });

    // Append the list to the element
    element.appendChild(list);
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
