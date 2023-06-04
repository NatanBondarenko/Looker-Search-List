looker.plugins.visualizations.add({
  options: {},
  create: function(element, config) {
    // Define the help sections as a nested object
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

    // Create the tree structure for help sections
    const tree = document.createElement('ul');
    tree.classList.add('help-tree');

    helpSections.forEach((section, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span class="help-section-title">${section.title}</span>
        <div class="help-section-content">${section.content}</div>
      `;
      listItem.classList.add('help-section');

      listItem.addEventListener('click', () => {
        listItem.classList.toggle('active');
      });

      tree.appendChild(listItem);
    });

    // Append the tree to the element
    element.appendChild(tree);
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    // No data manipulation or updates needed for this visualization
    doneRendering();
  }
});
