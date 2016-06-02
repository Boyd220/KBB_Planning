app.controller('dagplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.dagplanning = {};
$scope.content="oogst";
$scope.dataKeus = "Datum";
        $('#datumDag').keypress(function (e) 
      {
        if (e.keyCode == 13) 
        {
          var d = $("#datumDag").val();
          
          Data.get('dagplanningen/' + d).then(function(result)
          {
              Data.toast(result);
              $scope.weekplanningen = result.data;
          });
        }
      });

    $scope.getDatumDagplanning = function(dagplanning){
        Data.get('dagplanningen/datum/' + dagplanning.datum).then(function(result){
            Data.toast(result);
            $scope.dagplanningen = result.data;
        });
    };

        $scope.getTuinDagplanning = function(dagplanning){
        Data.get('dagplanningen/tuin/' + dagplanning.tuin).then(function(result){
            Data.toast(result);
            $scope.dagplanningen = result.data;
        });
    };

    $scope.deleteDagplanning= function(dagplanning){
        if(confirm("Weet u zeker dat u deze dagplanning wilt verwijderen?")){
            Data.delete("dagplanningen/"+dagplanning.id).then(function(result){
                Data.toast(result);
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

 $scope.columnsOogst = [
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsDieven = [
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];


 $scope.columnsBladknippen = [
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsSnoeien = [
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen",predicate:"Aantal mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsZakken = [
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
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
            if(dagplanning.id > 0){
                Data.put('dagplanningen/'+dagplanning.id, dagplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(dagplanning);
                        x.save = 'update';
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        Data.toast(result);
                    }
                });
            }else{
                Data.post('dagplanningen', dagplanning).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(dagplanning);
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