 var app = angular.module("app",[]);
app.controller("mijnCtrl", function($scope){
	console.log("in ctrl");
  $scope.title = "Hello world";
  $scope.updateTitle = function() {
    $scope.title = title;
  }

});
  

