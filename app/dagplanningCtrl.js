app.controller('dagplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.dagplanning = {};
    Data.get('dagplanningen').then(function(data){
        $scope.dagplanningen = data.data;
    });
    $scope.deleteDagplanning= function(dagplanning){
        if(confirm("Weet u zeker dat u deze dagplanning wilt verwijderen?")){
            Data.delete("dagplanningen/"+dagplanning.id).then(function(result){
                $scope.dagplanningen = _.without($scope.dagplanningen, _.findWhere($scope.dagplanningen, {id:dagplanning.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/planningen/dagplanningEdit.html',
          controller: 'dagplanningenEditCtrl',
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
                $scope.dagplanningen.push(selectedObject);
                $scope.dagplanningen = $filter('orderBy')($scope.dagplanningen, 'id', 'reverse');
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


app.controller('dagplanningenEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.dagplanning = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk dagplanning' : 'Voeg dagplanning toe';
        $scope.buttonText = (item.id > 0) ? 'Sla bewerking op' : 'Voeg nieuwe dagplanning toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.dagplanning);
        }
        $scope.saveDagplanning = function (dagplanning) {
            dagplanning.uid = $scope.uid;
            if(dagplanning.id > 0){
                Data.put('dagplanningen/'+dagplanning.id, dagplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(dagplanning);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('dagplanningen', dagplanning).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(dagplanning);
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