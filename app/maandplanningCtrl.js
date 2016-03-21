app.controller('maandplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.werknemer = {};
    Data.get('maandplanningen').then(function(data){
        $scope.maandplanningen = data.data;
    });
    $scope.deleteMaandplanning= function(maandplanning){
        if(confirm("Weet u zeker dat u deze maandplanning wilt verwijderen?")){
            Data.delete("maandplanningen/"+maandplanning.id).then(function(result){
                $scope.maandplanningen = _.without($scope.maandplanningen, _.findWhere($scope.maandplanningen, {id:maandplanning.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/planningen/maandplanningEdit.html',
          controller: 'maandplanningEditCtrl',
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
                $scope.maandplanningen.push(selectedObject);
                $scope.maandplanningen = $filter('orderBy')($scope.werknemers, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                        p.id = selectedObject.id;
            }
        });
    };
    
 $scope.columns = [
                    {text:"ID",predicate:"ID",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

});


app.controller('maandplanningenEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.maandplanning = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk maandplanning' : 'Voeg maandplanning toe';
        $scope.buttonText = (item.id > 0) ? 'Sla bewerking op' : 'Voeg nieuwe maandplanning toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.maandplanning);
        }
        $scope.saveMaandplanning = function (maandplanning) {
            maandplanning.uid = $scope.uid;
            if(maandplanning.id > 0){
                Data.put('maandplanningen/'+maandplanning.id, maandplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(maandplanning);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('maandplanningen', maandplanning).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(maandplanning);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
