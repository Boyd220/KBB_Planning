app.controller('jaarplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.jaarplanning = {};

    
          $('#Year').keypress(function (e) {
        if (e.keyCode == 13) {
            var jaar = $('#Year').val();

        Data.get('jaarplanningen/' + jaar).then(function(result){
            $scope.jaarplanningen = result.data;
        });
    
}
});

    $scope.getJaarplanning = function(jaarplanning){
        Data.get('jaarplanningen/' + jaarplanning.jaar).then(function(result){
            $scope.jaarplanningen = result.data;
            console.log(jaarplanning.jaar);
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
                     {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte norm",predicate:"Verwachte norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsDieven = [
                     {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte norm",predicate:"Verwachte norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];


 $scope.columnsBladknippen = [
                     {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte norm",predicate:"Verwachte norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsSnoeien = [
                     {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte norm",predicate:"Verwachte norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsZakken = [
                     {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte norm",predicate:"Verwachte norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsVerpakking = [
                     {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Verwachting pallets",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Verwachte norm",predicate:"Verwachte norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsOverige = [
                    {text:"Nog in te vullen",predicate:"Nog in te vullen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

});


app.controller('jaarplanningenEditCtrl', function ($scope, $modalInstance, item, Data) {
        $scope.getWeeknumber = function(dt) 
  {
     var tdt = new Date(dt.valueOf());
     var dayn = (dt.getDay() + 6) % 7;
     tdt.setDate(tdt.getDate() - dayn + 3);
     var firstThursday = tdt.valueOf();
     tdt.setMonth(0, 1);
     if (tdt.getDay() !== 4) 
       {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
     return 1 + Math.ceil((firstThursday - tdt) / 604800000);
        }
$scope.convertWeeknumber = function(dt) {
        blaa = new Date(dt);
        $scope.weeknr = $scope.getWeeknumber(blaa);

}
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
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        Data.toast(result);
                        console.log(result);
                    }
                });
            }else{
                Data.post('jaarplanningen', jaarplanning).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(jaarplanning);
                        x.save = 'insert';
                        x.id = result.data;
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        Data.toast(result);
                        console.log(result);
                    }
                });
            }
        };
});
