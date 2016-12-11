'use strict';

angular.module('bookShowcase.component.version', [
  'bookShowcase.component.version.interpolate-filter',
  'bookShowcase.component.version.version-directive'
])

.value('version', '0.1');
