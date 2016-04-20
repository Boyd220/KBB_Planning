app.controller('jaarplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.jaarplanning = {};
    $scope.getJaarplanning = function(jaarplanning){
        Data.get('jaarplanningen/' + jaarplanning.jaar).then(function(result){
            $scope.jaarplanningen = result.data;
        });
    };
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
    
$scope.columnsAlgemeen = [
                    {text:"Planten oogst",predicate:"Planten oogst",sortable:true,dataType:"number"},
                    {text:"Planten Dieven/Draaien",predicate:"Planten Dieven/draaien",sortable:true,dataType:"number"},                  
                    {text:"Planten bladknippen",predicate:"Planten bladknippen",sortable:true,dataType:"number"},
                    {text:"Planten snoeien",predicate:"Planten snoeien",sortable:true,dataType:"number"},
                    {text:"Planten zakken",predicate:"Planten zakken",sortable:true,dataType:"number"},
                    {text:"Aantal pallets",predicate:"Aantal pallets",sortable:true,dataType:"number"},
                    {text:"Norm verpakking",predicate:"Norm verpakking",sortable:true,dataType:"number"},
                    {text:"Totaal uren",predicate:"Totaal uren",sortable:true,dataType:"number"},
                    {text:"Totaal mensen",predicate:"Totaal mensen",sortable:true,dataType:"number"},                   
                    {text:"Totaal resulaat uren",predicate:"Totaal resulaat uren",sortable:true,dataType:"number"},
                ];

 $scope.columnsOogst = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsDieven = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];


 $scope.columnsBladknippen = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsSnoeien = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsZakken = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsVerpakking = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat pallets",predicate:"Resultaat pallets",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsOverige = [
                    {text:"Nog in te vullen",predicate:"Nog in te vullen",sortable:true,dataType:"number"},
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
