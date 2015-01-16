require('angular');
var app = angular.module('app');
require('./views/templates');

require('./services');

require('./controllers');

require('./directives');
require('./directives/templates/templates');


app.config(require('./provider-settings'));
app.config(require('./routes'));


