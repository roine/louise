'use strict';

// Libraries
require('angular');
require('angular-route');
require('angular-animate');
require('jquery');
require('angular-ui-router');

angular.module('app', ['ngRoute', 'ngAnimate', 'ui.router']);

// Load all my files in index.js
require('./');
angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});


