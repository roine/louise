module.exports = function ($routeProvider) {
    $routeProvider
        .when('/home', {templateUrl: 'views/home.html'})
        .otherwise('/home');
}