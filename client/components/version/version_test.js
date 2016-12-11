'use strict';

describe('bookShowcase.version module', function() {
  beforeEach(module('bookShowcase.component.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
