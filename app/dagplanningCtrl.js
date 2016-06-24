app.controller('dagplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.dagplanning = {};
$scope.content="oogst";
$scope.content1="TuinOogst"
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

        $scope.getTuinOogstDagplanning = function(dagplanning){
        Data.get('dagplanningen/tuinOogst/' + dagplanning.tuinOogst).then(function(result){
            Data.toast(result);
            $scope.dagplanningen = result.data;
        });
    };

            $scope.getTuinDievenDagplanning = function(dagplanning){
        Data.get('dagplanningen/tuinDieven/' + dagplanning.tuinDieven).then(function(result){
            Data.toast(result);
            $scope.dagplanningen = result.data;
        });
    };

            $scope.getTuinBladDagplanning = function(dagplanning){
        Data.get('dagplanningen/tuinBlad/' + dagplanning.tuinBlad).then(function(result){
            Data.toast(result);
            $scope.dagplanningen = result.data;
        });
    };

            $scope.getTuinSnoeienDagplanning = function(dagplanning){
        Data.get('dagplanningen/tuinSnoeien/' + dagplanning.tuinSnoeien).then(function(result){
            Data.toast(result);
            $scope.dagplanningen = result.data;
        });
    };

            $scope.getTuinZakkenDagplanning = function(dagplanning){
        Data.get('dagplanningen/tuinZakken/' + dagplanning.tuinZakken).then(function(result){
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
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen nodig",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsDieven = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen nodig",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];


 $scope.columnsBladknippen = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen nodig",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsSnoeien = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen nodig",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsZakken = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Aantal mensen nodig",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsVerpakking = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Pallets",predicate:"Verwachte pallets",sortable:true,dataType:"number"},
                    {text:"Aantal mensen nodig",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
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