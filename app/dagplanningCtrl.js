app.controller('dagplanningCtrl', function ($scope, $modal, $filter, Data) {
    
    $scope.dagplanning = {};

    $scope.getDagplanning = function(dagplanning){
        Data.get('dagplanningen/' + dagplanning.datum).then(function(result){
            $scope.dagplanningen = result.data;
        });
    };

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
$scope.columnsAlgemeen = [
                    {text:"Planten oogst",predicate:"Planten oogst",sortable:true,dataType:"number"},
                    {text:"Norm oogst",predicate:"Norm oogst",sortable:true,dataType:"number"},
                    {text:"Planten Dieven/Draaien",predicate:"Planten Dieven/draaien",sortable:true,dataType:"number"},                  
                    {text:"Norm dieven/draaien",predicate:"Norm dieven/draaien",sortable:true,dataType:"number"},
                    {text:"Planten bladknippen",predicate:"Planten bladknippen",sortable:true,dataType:"number"},
                    {text:"Norm bladknippen",predicate:"Norm bladknippen",sortable:true,dataType:"number"},
                    {text:"Planten snoeien",predicate:"Planten snoeien",sortable:true,dataType:"number"},
                    {text:"Norm snoeien",predicate:"Norm snoeien",sortable:true,dataType:"number"},
                    {text:"Planten zakken",predicate:"Planten zakken",sortable:true,dataType:"number"},
                    {text:"Norm zakken",predicate:"Norm zakken",sortable:true,dataType:"number"},
                    {text:"Aantal pallets",predicate:"Aantal pallets",sortable:true,dataType:"number"},
                    {text:"Norm verpakking",predicate:"Norm verpakking",sortable:true,dataType:"number"},
                    {text:"Totaal uren",predicate:"Totaal uren",sortable:true,dataType:"number"},
                    {text:"Totaal mensen",predicate:"Totaal mensen",sortable:true,dataType:"number"},                   
                    {text:"Totaal resulaat uren",predicate:"Totaal resulaat uren",sortable:true,dataType:"number"},
                ];

 $scope.columnsOogst = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsDieven = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];


 $scope.columnsBladknippen = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsSnoeien = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsZakken = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsVerpakking = [
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Pallets",predicate:"Verwachte pallets",sortable:true,dataType:"number"},
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