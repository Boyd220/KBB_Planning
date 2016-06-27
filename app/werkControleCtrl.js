app.controller('werkControleCtrl', function ($scope, $modal, $filter, Data) {
    $scope.controle = {};

          Data.get('controles').then(function(result)
          {
               $scope.controles = result.data;
          });
        
    $scope.open = function (p,size) {
      getRandomInt(1000,1400);
        var modalInstance = $modal.open({
          templateUrl: 'partials/werkControleEdit.html',
          controller: 'werkControleEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
              console.log(p);
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.controles.push(selectedObject);
                $scope.controles = $filter('orderBy')($scope.controles, 'id', 'reverse');

            }else if(selectedObject.save == "update"){
                        p.id = selectedObject.id;
            }
        });
    };

    function getRandomInt(min, max) {
 $scope.controle.rijOogst= Math.floor(Math.random() * (max - min + 1) + min);
}
 $scope.columns = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"date"},
                    {text:"Rij",predicate:"Rij",sortable:true},
                    {text:"Tuin",predicate:"Tuin",sortable:true},
                    {text:"Teveel hangen",predicate:"teveel hangen",sortable:true},
                    {text:"Beschadiging tomaat",predicate:"Beschadiging tomaat",sortable:true},
                    {text:"Beschadiging gewas",predicate:"Beschadiging gewas",sortable:true},
                    {text:"Opmerking",predicate:"Beschadiging gewas",sortable:true},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];
});


app.controller('werkControleEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.controle = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk controle' : 'Voeg controle toe';
        $scope.buttonText = (item.id > 0) ? 'Sla controle op' : 'Voeg nieuwe controle toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.controle);
        }
        $scope.saveControle = function (controle) {
            if(controle.id > 0){
                Data.put('controles/'+controle.id,controle).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(controle);
                        x.save = 'update';
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        Data.toast(result);
                    }
                });
            }else{
                Data.post('controles', controle).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(controle);
                        x.save = 'insert';
                        x.id = result.data;
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        Data.toast(result);

                    }
                });
            }
        };
});