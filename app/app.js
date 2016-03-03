var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/Werknemers', {
      title: 'Werknemers',
      templateUrl: 'partials/werknemers.html',
      controller: 'werknemersCtrl'
    })
    .when('/Planningen', {
      title: 'Planningen',
      templateUrl: 'partials/planning.html',
    })
    .when('/Planningen/Dagplanning',{
      title: 'Dagplanning',
      templateUrl: 'partials/planningen/dagplanning.html',
      controller: 'dagplanningCtrl'
    })
    .when('/Planningen/Weekplanning',{
      title: 'Weekplanning',
      templateUrl: 'partials/planningen/weekplanning.html',
      controller: 'weekplanningCtrl'
    })
    .when('/Planningen/Maandplanning',{
      title: 'Maandplanning',
      templateUrl: 'partials/planningen/maandplanning.html',
      controller: 'maandplanningCtrl'
    })
    .when('/Planningen/Jaarplanning',{
      title: 'Jaarplanning',
      templateUrl: 'partials/planningen/jaarplanning.html',
      controller: 'jaarplanningCtrl'
    })
    .otherwise({
      redirectTo: '/Werknemers'
    });;
}]);
    