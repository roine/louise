require('angular');
angular.module('app')
    .controller('HomeCtrl', function (parse) {
        parse.getOptions().then(function(options){
            console.log(options);
        });
    });