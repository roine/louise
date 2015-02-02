var parse = require('./parse');
var requestsCacheFn = require('./cache').requests;
require('angular-mocks');

describe('Parse Service', function () {
    var service,
        q,
        cacheFactory,
        requestsCache,
        timeout;

    // Add matcher
    beforeEach(function () {
        var matchers = {
            toBePromise: function (util) {
                return {
                    compare: function (actual) {
                        var result = {};
                        result.pass = typeof actual === "object" && typeof actual.then === "function";

                        if (result.pass) {
                            result.message = "Expected var not be a Promise";
                        }
                        else {
                            result.message = 'Expected var to be a Promise';
                        }
                        return result;
                    }
                };
            }
        };
        jasmine.addMatchers(matchers);
    });

    // Get the services
    beforeEach(angular.mock.inject(function ($injector) {
        q = $injector.get('$q');
        cacheFactory = $injector.get('$cacheFactory');
        requestsCache = requestsCacheFn(cacheFactory);
        timeout = $injector.get('$httpBackend');

        // new instance before each test
        service = parse(q, cacheFactory, requestsCache);
    }));

    describe('getOptions', function () {

        it('should return a promise', function () {
            var promise = service.getOptions();
            expect(promise).toBePromise();
        });

        it('should cache the data on first call', function () {
            expect(requestsCache.get('options')).toBeUndefined();
        });
    });
});