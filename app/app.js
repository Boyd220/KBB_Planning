var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            }).    when('/Werknemers', {
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
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.id) {
                    $rootScope.authenticated = true;
                    $rootScope.id = results.id;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });