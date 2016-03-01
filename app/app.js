var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Werknemers',
      templateUrl: 'partials/werknemers.html',
      controller: 'werknemersCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    