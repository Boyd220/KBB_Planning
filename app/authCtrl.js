app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (werknemer) {
        Data.post('login', {
            werknemer: werknemer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                console.log(results);
                $location.path('dashboard');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'', u_role:''};
    $scope.signUp = function (werknemer) {
        Data.post('signUp', {
            werknemer: werknemer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
});