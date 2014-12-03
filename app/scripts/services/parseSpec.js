var parse = require('./parse');

describe('Parse Service', function () {
    var service;
    beforeEach(function () {
        service = parse();
    });

    describe('getOptions', function () {
        it('should return a promise', function () {
            console.log(parse)
            console.log(service);
            var promise  = service.getOptions();
            expect(promise).toBe('')
        });
    });
});