require('angular');
require('./views/templates');

var app = angular.module('app');
app.config(require('./routes'));
