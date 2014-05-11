describe("filters", function() {
  beforeEach(module('common/filters'));

  describe("dollars", function() {
    it("should return a string of repeated dollars", inject(function(dollarsFilter) {
      expect(dollarsFilter(3)).toEqual('$$$');
    }));
  });

  describe("stars", function() {
    it("should return a string of repeated stars", inject(function(starsFilter) {
      expect(starsFilter(3)).toEqual('\u2605\u2605\u2605');
    }));
  });
});