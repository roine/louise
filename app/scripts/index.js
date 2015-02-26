require('angular');
angular.module('app')
    .config(require('./provider-settings'))
    .config(require('./routes'));

require('./views/templates');
require('./services');
require('./controllers');
require('./directives');
require('./directives/templates/templates');



