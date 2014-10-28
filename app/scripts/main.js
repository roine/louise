'use strict';

// Libraries
require('angular');
require('angular-route');
require('jquery');



angular.module('app', ['ngRoute']);

// Load all my files in index.js
require('./');

angular.bootstrap(document, ['app']);


