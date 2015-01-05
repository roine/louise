'use strict';

// Libraries
require('angular');
require('angular-route');
require('angular-animate');
require('jquery');


angular.module('app', ['ngRoute', 'ngAnimate']);

// Load all my files in index.js
require('./');

angular.bootstrap(document, ['app']);


