var Parse = require('parse-browserify');
require('angular');
require('./cache');

angular.module('app')
    .factory('parse', ParseService);

/*@ngInject*/
function ParseService($q, $cacheFactory, requestsCache) {
    'use strict';
    var projects = [];

    var _public = {
        projects: projects,
        getOptions: getOptions,
        getProjects: getProjects,
        getProject: getProject,
        findBy: findBy,
        findBySlug: findBySlug
    };

    init();

    return _public;

    /**
     * Initialise Parse
     */
    function init() {
        Parse.initialize("qPxiJXr2GBwaJUKNGRG6ndAYBUg8VDLa5Rz2wxwl", "Pd7AG4zeX4hrB3TOuWIO9KloXaxq0ta115GPRlwa");
    }

    /**
     * Initialise the Parse query
     * @param {string} className - prepare the query
     * @returns {Collection}
     */
    function query(className) {
        var Collection = Parse.Collection.extend({model: className});
        return new Collection();
    }

    /**
     * Get the options and settings
     * @returns {Promise}
     */
    function getOptions() {
        var defer = $q.defer();
        var cachedOptions = requestsCache.get('options');

        // if cached get locally...
        if (cachedOptions) {
            defer.resolve(cachedOptions);
            return defer.promise;
        }
        // else get on server
        query('options').fetch({
            success: function (response) {
                var cleanObj = {};
                angular.forEach(response, function (obj, key) {
                    cleanObj[obj.get('key')] = obj.get('value');
                });
                requestsCache.put('options', cleanObj);
                defer.resolve(cleanObj);
            },
            error: function (errors) {
                defer.reject(errors);
            }
        });


        return defer.promise;
    }

    /**
     * Get the projects
     * @returns {Promise}
     */
    function getProjects() {
        var defer = $q.defer();
        var cachedProjects = requestsCache.get('Projects');

        // if cached get locally...
        if (cachedProjects) {
            defer.resolve(cachedProjects);
            return defer.promise;
        }
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
                    projects.push(cleanObj);
                });
                requestsCache.put('Projects', projects);
                defer.resolve(projects);
            },
            error: function (errors) {
                defer.reject(errors);
            }
        });
        return defer.promise;
    }

    /**
     * @param {object} params
     */
    function getProject(params) {
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
                var project = {};
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
    }

    /**
     * Find a project
     * @param {string} type - the column in which to search
     * @param {string} where - the value to find
     * @returns {Promise}
     */
    function findBy(type, where) {
        var defer = $q.defer();
        if (!type) {
            defer.reject('type is required');
            return defer.promise;
        }

        var projects = requestsCache.get('Projects');

        // if no project already fetched then fetch this specific project
        if (!projects) {
            var project = {};
            project[type] = where;
            return getProject(project);
        }
        else {
            angular.forEach(projects, function (project) {
                if (project[type] === where) {
                    defer.resolve(project);
                    return false;
                }
            });
        }

        return defer.promise;
    }

    /**
     * Alias for findBy with a pre defined param
     * @param {string} slug
     */
    function findBySlug(slug) {
        return findBy('slug', slug);
    }

}