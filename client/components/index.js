require('./version/version.js');
require('./version/version-directive.js');
require('./version/interpolate-filter.js');

angular.module('bookShowcase.components', [
  'bookShowcase.component.version'
]);
