app.controller('weekplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.weekplanning = {};

    $scope.getByDatumWeekplanning = function(weekplanning){
        bla = new Date(weekplanning.weeknr);
        var jaar = bla.getFullYear();
        var week = $scope.getWeeknumber(bla)+"-"+jaar;
        console.log(week);
        Data.get('weekplanningen/week/' + week).then(function(result){
                      Data.toast(result);
            $scope.weekplanningen = result.data;

        });
    };

    $scope.getByWeekWeekplanning = function(weekplanning){
      console.log(weekplanning.weeknr);
        Data.get('weekplanningen/week/' + weekplanning.weeknr).then(function(result){
                      Data.toast(result);
            $scope.weekplanningen = result.data;

        });
    };

      $scope.getByTuinWeekplanning = function(weekplanning){
        Data.get('weekplanningen/tuin/' +weekplanning.tuin).then(function(result){
                      Data.toast(result);
            $scope.weekplanningen = result.data;

        });
    };

  /*$("#weeklyDatePicker").datetimepicker({
      format: 'MM-DD-YYYY'
  });

   //Get the value of Start and End of Week
  $('#weeklyDatePicker').on('dp.change', function (e) {
      var value = $("#weeklyDatePicker").val();
      var firstDate = moment(value, "MM-DD-YYYY").day(0).format("MM-DD-YYYY");
      var lastDate =  moment(value, "MM-DD-YYYY").day(6).format("MM-DD-YYYY");
      $("#weeklyDatePicker").val(firstDate + " - " + lastDate);
  });
    $scope.getWeekplanning = function(weekplanning){
        Data.get('weekplanningen/' + weekplanning.weeknr).then(function(result){
            $scope.weekplanningen = result.data;
        });
    };*/

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

        $scope.selectedWeek = function(d){
    w = new Date(d);
    $scope.selected= $scope.getWeeknumber(w);
}

dt = new Date();
$scope.weekje = [
{text: $scope.getWeeknumber(dt), predicate: $scope.getWeeknumber(dt), sortable:true, dataType:"number"}
]

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
                $scope.weekplanningen = $filter('orderBy')($scope.weekplanningen, 'id', 'reverse');
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
                    {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsDieven = [
                    {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];


 $scope.columnsBladknippen = [
                    {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsSnoeien = [
                    {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsZakken = [
                    {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsVerpakking = [
                    {text:"Weeknummer",predicate:"Weeknummer",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Benodigde mensen",predicate:"Benodigde mensen",sortable:true,dataType:"number"},
                    {text:"Beschikbare mensen",predicate:"Beschikbare mensen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

 $scope.columnsOverige = [
                    {text:"Nog in te vullen",predicate:"Nog in te vullen",sortable:true,dataType:"number"},
                    {text:"Action",predicate:"",sortable:false}
                ];

});


app.controller('weekplanningenEditCtrl', function ($scope, $modalInstance, item, Data) {

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
        $scope.selectedWeek = function(d){
    w = new Date(d);
    $scope.selected= $scope.getWeeknumber(w);
}
$scope.getW = function(d){
    w = new Date(d);
    var jaar = w.getFullYear();
console.log($scope.getWeeknumber(w));
    $scope.weeknr= $scope.getWeeknumber(w)+"-"+jaar;
    $scope.date = w;
}
    
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

            if(weekplanning.id > 0){
                Data.put('weekplanningen/'+weekplanning.id, weekplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(weekplanning);
                        x.save = 'update';
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                        Data.toast(result);
                    }
                });
            }else{
                Data.post('weekplanningen', weekplanning).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(weekplanning);
                        x.save = 'insert';
                        x.id = result.data;
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                        Data.toast(result);
                    }
                });
            }
        };
});
