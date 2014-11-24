module.exports = function ($q, $cacheFactory, $exceptionHandler) {
    'use strict';
    var _public = {};
    var cacheRequests;

    _public.projects = [];

    /**
     * Initialise Parse
     */
    function init() {
        Parse.initialize("qPxiJXr2GBwaJUKNGRG6ndAYBUg8VDLa5Rz2wxwl", "Pd7AG4zeX4hrB3TOuWIO9KloXaxq0ta115GPRlwa");
        cacheRequests = $cacheFactory('requests');

    }

    /**
     * Initialise the Parse query
     * @param className
     * @returns {Collection}
     */
    function query(className) {
        var Collection = Parse.Collection.extend({model: className});
        return new Collection();
    }

    /**
     * Get the options and settings
     * @returns {*}
     */
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

    /**
     * Get the projects
     * @returns {*}
     */
    _public.getProjects = function () {
        var defer = $q.defer();
        query('Projects').fetch({
            success: function (response) {
                angular.forEach(response, function (obj, key) {
                    var cleanObj = {
                        title: obj.get('title'),
                        summary: obj.get('summary'),
                        description: obj.get('description'),
                        information: obj.get('information'),
                        collaborators: obj.get('collaborators'),
                        slug: obj.get('slug'),
                        id: obj.id
                    };
                    _public.projects.push(cleanObj);
                });
                cacheRequests.put('Projects', _public.projects);
                defer.resolve(_public.projects);
            },
            error: function (errors) {
                defer.reject(errors);
            }
        });
        return defer.promise;
    };

    /**
     * @param obj of params
     */
    _public.getProject = function (params) {
        var defer = $q.defer(),
            key = Object.keys(params)[0],
            acceptedKeys = ['slug', 'id'];

        if (!~acceptedKeys.indexOf(key)) {
            throw "You can only use one of these keys to find a project: " + acceptedKeys.join(', ');
        }
        var Projects = Parse.Object.extend("Projects");
        var query = new Parse.Query(Projects);
        query.equalTo(key, params[key]);
        query.find({
            success: function (response) {
                var project = {}
                angular.forEach(response, function (obj, key) {
                    project = {
                        title: obj.get('title'),
                        summary: obj.get('summary'),
                        description: obj.get('description'),
                        information: obj.get('information'),
                        collaborators: obj.get('collaborators'),
                        slug: obj.get('slug'),
                        id: obj.id
                    };
                });
                defer.resolve(project);
            }
        });
        return defer.promise;
    };

    /**
     * Find a project
     * @param type
     * @param where
     * @returns {*}
     */
    _public.findBy = function (type, where) {
        var defer = $q.defer();
        if (!type) {
            return false;
        }

        var projects = cacheRequests.get('Projects');

        // if no project already fetched then fetch this specific project
        if (!projects) {
            var project = {};
            project[type] = where;
            return _public.getProject(project);
        }

        angular.forEach(projects, function (project) {
            if (project[type] === where) {
                defer.resolve(project);
                return false;
            }
        });

        return defer.promise;
    };

    /**
     * Alias for findBy with a pre defined param
     * @param slug
     */
    _public.findBySlug = function (slug) {
        return _public.findBy('slug', slug);
    };

    init();

    return _public;
};