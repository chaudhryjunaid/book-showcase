require('./version/version.js');
require('./version/version-directive.js');
require('./version/interpolate-filter.js');
require('./login/login.js');
require('./login/login.styl');

angular.module('bookShowcase.components', [
  'bookShowcase.component.version',
  'bookShowcase.component.login'
]);
