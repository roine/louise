require('angular');

require('./views/templates');

require('./services');

require('./controllers');

require('./directives');
require('./directives/templates/templates');

var app = angular.module('app');
app.config(require('./routes'));

