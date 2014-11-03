module.exports = function ($q) {
    'use strict';
    var _public = {};

    var init = function () {
        Parse.initialize("qPxiJXr2GBwaJUKNGRG6ndAYBUg8VDLa5Rz2wxwl", "Pd7AG4zeX4hrB3TOuWIO9KloXaxq0ta115GPRlwa");

    };

    _public.getOptions = function () {
        var defer = $q.defer();

        var options = Parse.Object.extend("options");
        var query = new Parse.Query(options);
        query.find({
            success: function (options) {
                var cleanOptions = {};
                angular.forEach(options, function (option, key) {
                    cleanOptions[option.get('key')] = option.get('value');
                });
                defer.resolve(cleanOptions);
            },
            error: function (errors) {
                defer.reject(errors);
            }
        });

        return defer.promise;
    };

    init();

    return _public;
};