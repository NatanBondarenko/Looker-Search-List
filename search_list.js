import * as d3 from './d3loader';
import { VisPluginTableModel } from './vis_table_plugin';

const createTableFromData = (data) => {
  const visContainer = d3.select('#visContainer').node();
  if (!visContainer) {
    d3.select('#vis')
      .append('div')
      .attr('id', 'visContainer')
      .style('height', '80vh')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('justify-content', 'center')
      .style('font-size', '13px')
      .style('font-family', '"Open Sans", "Helvetica", "Arial", sans-serif')
      .style('text-anchor', 'middle')
      .style('text-align', 'center')
      .text('No Results');
  } else {
    d3.select('#visContainer').html('').text('No Results');
  }

  const dataTable = new VisPluginTableModel(data);
  const config = {
    theme: 'looker',
    layout: 'auto',
    customTheme: null,
    headerFontSize: 12,
    bodyFontSize: 12,
    showHighlight: true,
    showTooltip: true,
  };

  const removeStyles = async function () {
    const links = document.getElementsByTagName('link');
    while (links[0]) links[0].parentNode.removeChild(links[0]);

    Object.keys(themes).forEach(async (theme) => await themes[theme].unuse());
  };

  const loadStylesheet = function (link) {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', link);
    document.getElementsByTagName('head')[0].appendChild(linkElement);
  };

  const themes = {
    traditional: require('./theme_traditional.css'),
    looker: require('./theme_looker.css'),
    contemporary: require('./theme_contemporary.css'),
    fixed: require('./layout_fixed.css'),
    auto: require('./layout_auto.css'),
  };

  const buildReportTable = function () {
    const table = d3
      .select('#visContainer')
      .append('table')
      .attr('id', 'reportTable')
      .attr('class', 'reportTable')
      .style('opacity', 0);

    // ... Rest of the code from the original table code ...

    // Replace the remaining code with your own logic to populate the table using "data"

    return table;
  };

  removeStyles().then(() => {
    if (
      typeof config.customTheme !== 'undefined' &&
      config.customTheme &&
      config.theme === 'custom'
    ) {
      loadStylesheet(config.customTheme);
    } else if (typeof themes[config.theme] !== 'undefined') {
      themes[config.theme].use();
    }
    if (typeof themes[config.layout] !== 'undefined') {
      themes[config.layout].use();
    }
  });

  buildReportTable();
};

// Example usage
const data = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 40 },
];

createTableFromData(data);
