app.controller('weekplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.werknemer = {};
    Data.get('weekplanningen').then(function(data){
        $scope.weekplanningen = data.data;
    });
    $scope.deleteWeekplanning= function(weekplanning){
        if(confirm("Weet u zeker dat u deze weekplanning wilt verwijderen?")){
            Data.delete("weekplanningen/"+weekplanning.id).then(function(result){
                $scope.weekplanningen = _.without($scope.weekplanningen, _.findWhere($scope.weekplanningen, {id:weekplanning.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/planningen/weekplanningEdit.html',
          controller: 'weekplanningenEditCtrl',
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
                $scope.weekplanningen.push(selectedObject);
                $scope.weekplanningen = $filter('orderBy')($scope.werknemers, 'id', 'reverse');
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


app.controller('weekplanningenEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.weekplanning = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk weekplanning' : 'Voeg weekplanning toe';
        $scope.buttonText = (item.id > 0) ? 'Sla bewerking op' : 'Voeg nieuwe weekplanning toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.weekplanning);
        }
        $scope.saveWeekplanning = function (weekplanning) {
            weekplanning.uid = $scope.uid;
            if(weekplanning.id > 0){
                Data.put('weekplanningen/'+weekplanning.id, weekplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(weekplanning);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('weekplanningen', weekplanning).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(weekplanning);
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
