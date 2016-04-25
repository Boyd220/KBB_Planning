var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl',
            
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl',
                authenticate: 'true'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl',
                authenticate: 'true'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                authenticate: 'true'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            }).    when('/Werknemers', {
      title: 'Werknemers',
      templateUrl: 'partials/werknemers.html',
      controller: 'werknemersCtrl',
                role: '0'
    })
    .when('/Planningen', {
      title: 'Planningen',
      templateUrl: 'partials/planning.html',
                role: '0',
                authenticate: 'true'
    })
    .when('/Planningen/Dagplanning',{
      title: 'Dagplanning',
      templateUrl: 'partials/planningen/dagplanning.html',
      controller: 'dagplanningCtrl',
                role: '0',
                authenticate: 'true'
    })
    .when('/Planningen/Weekplanning',{
      title: 'Weekplanning',
      templateUrl: 'partials/planningen/weekplanning.html',
      controller: 'weekplanningCtrl',
                role: '0',
                authenticate: 'true'
    })
    .when('/Planningen/Maandplanning',{
      title: 'Maandplanning',
      templateUrl: 'partials/planningen/maandplanning.html',
      controller: 'maandplanningCtrl',
                role: '0',
                authenticate: 'true'
    })
    .when('/Planningen/Jaarplanning',{
      title: 'Jaarplanning',
      templateUrl: 'partials/planningen/jaarplanning.html',
      controller: 'jaarplanningCtrl',
                role: '0',
                authenticate: 'true'
    })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            $rootScope.admin = false;
            $rootScope.manager=false;
            $rootScope.guest = true;
            $rootScope.rol;
            Data.get('session').then(function (results) {
                if (results.id) {
                    $rootScope.authenticated = true;
                    $rootScope.id = results.id;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.created = results.created;
                    $rootScope.u_role = results.u_role;

                    if (results.u_role==1) 
                    {
                      $rootScope.admin = true;
                      $rootScope.manager = false;
                      $rootScope.guest = false;
                      $rootScope.rol="Admin";
                    }

                    if (results.u_role==2) 
                    {
                      $rootScope.admin = false;
                      $rootScope.manager = true;
                      $rootScope.guest = false;
                      $rootScope.rol="Manager";
                    }  

                    if (results.u_role==3) 
                    {
                      $rootScope.admin = false;
                      $rootScope.manager = false;
                      $rootScope.guest = true;
                      $rootScope.rol="Werknemer";
                    }  

                    console.log($rootScope.admin, $rootScope.manager, $rootScope.guest, $rootScope.rol);
                }
                 else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login' || nextUrl=='/Werknemers') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });