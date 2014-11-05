module.exports = function ($q) {
    'use strict';
    var _public = {};

    var init = function () {
        Parse.initialize("qPxiJXr2GBwaJUKNGRG6ndAYBUg8VDLa5Rz2wxwl", "Pd7AG4zeX4hrB3TOuWIO9KloXaxq0ta115GPRlwa");

    };

    function query(className) {
        var Collection = Parse.Collection.extend({model: className});
        return new Collection();
    }

    _public.getOptions = function () {
        var defer = $q.defer();
        query('options').fetch({
            success: function (response) {
                var cleanObj = {};
                angular.forEach(response, function (obj, key) {
                    cleanObj[obj.get('key')] = obj.get('value');
                });
                defer.resolve(cleanObj);
            },
            error: function (errors) {
                defer.reject(errors);
            }
        });
        return defer.promise;
    };

    _public.getProjects = function () {
        var defer = $q.defer();
        query('Projects').fetch({
            success: function (response) {
                var cleanArr = [];
                angular.forEach(response, function (obj, key) {
                    var cleanObj = {
                        title: obj.get('title'),
                        summary: obj.get('summary'),
                        description: obj.get('description'),
                        information: obj.get('information'),
                        collaborators: obj.get('collaborators'),
                        id: key + 1
                    };
                    cleanArr.push(cleanObj);
                });

                defer.resolve(cleanArr);
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