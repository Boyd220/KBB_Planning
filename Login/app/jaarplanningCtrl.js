app.controller('jaarplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.werknemer = {};
    Data.get('jaarplanningen').then(function(data){
        $scope.jaarplanningen = data.data;
    });
    $scope.deleteJaarplanning= function(jaarplanning){
        if(confirm("Weet u zeker dat u deze jaarplanning wilt verwijderen?")){
            Data.delete("jaarplanningen/"+jaarplanning.id).then(function(result){
                $scope.jaarplanningen = _.without($scope.jaarplanningen, _.findWhere($scope.jaarplanningen, {id:jaarplanning.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/planningen/jaarplanningEdit.html',
          controller: 'jaarplanningenEditCtrl',
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
                $scope.jaarplanningen.push(selectedObject);
                $scope.jaarplanningen = $filter('orderBy')($scope.werknemers, 'id', 'reverse');
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


app.controller('jaarplanningenEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.jaarplanning = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk jaarplanning' : 'Voeg jaarplanning toe';
        $scope.buttonText = (item.id > 0) ? 'Sla bewerking op' : 'Voeg nieuwe jaarplanning toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.jaarplanning);
        }
        $scope.saveJaarplanning = function (jaarplanning) {
            jaarplanning.uid = $scope.uid;
            if(jaarplanning.id > 0){
                Data.put('jaarplanningen/'+jaarplanning.id, jaarplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(jaarplanning);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('jaarplanningen', jaarplanning).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(jaarplanning);
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
