app.controller('weekplanningCtrl', function ($scope, $modal, $filter, Data) {
    $scope.weekplanning = {};

$scope.dataKeus = "Datum";
$scope.content="oogst";
$scope.weekplanning.weeknr ="";
$scope.weekplanning.tuin ="";

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;

$scope.filterData = function(){
  $scope.weekplanningen = null;
}
var outOfBounds;

        $('#datumWeek').keypress(function (e) 
      {
        if (e.keyCode == 13) 
        {
          var d = new Date($("#datumWeek").val());
          var jaar = d.getFullYear();
          var week = $scope.getWeeknumber(d)+"-"+jaar;
          
          Data.get('weekplanningen/week/' + week).then(function(result)
          {
              Data.toast(result);
              $scope.weekplanningen = result.data;
          });
        }
      });

    $('#datumWeekNr').keypress(function (e) 
      {
        if (e.keyCode == 13) 
        {
          var weeknr = $("#datumWeekNr").val();
            Data.get('weekplanningen/week/' + weeknr).then(function(result)
            {
            Data.toast(result);
            $scope.weekplanningen = result.data;
            });
        }
      });

    $('#tuinWeek').keypress(function (e, weekplanning) 
      {
        if (e.keyCode == 13 && !outOfBounds) 
        {var t = $("#tuinWeek").val();
            Data.get('weekplanningen/tuin/' +t).then(function(result)
            {
            Data.toast(result);
            $scope.weekplanningen = result.data;
            });

        }
      });

        $scope.$watch("weekplanning.weeknr",function(newVal,oldVal)
        {
            if($scope.weekplanning.weeknr.length>1 && $scope.weekplanning.weeknr.length<3)
            { 
                $scope.weekplanning.weeknr = $scope.weekplanning.weeknr+"-";
            }
        });

    $scope.$watch("weekplanning.tuin",function(newVal,oldVal)
        {
            if($scope.weekplanning.tuin>3 || $scope.weekplanning.tuin =="")
            { 
              $('#btnDatumTuin').attr('disabled', 'disabled');
              outOfBounds =true;
            }


           if($scope.weekplanning.tuin<=3 && $scope.weekplanning.tuin>0)
            { 
              $('#btnDatumTuin').removeAttr('disabled');
              outOfBounds = false;
            }
        });

        $scope.getByDatumWeekplanning = function(weekplanning){
        bla = new Date(weekplanning.weeknr);
        var jaar = bla.getFullYear();
        var week = $scope.getWeeknumber(bla)+"-"+jaar;
        
        Data.get('weekplanningen/week/' + week).then(function(result){
                      Data.toast(result);
            $scope.weekplanningen = result.data;

        });
    };

    $scope.getByWeekWeekplanning = function(weekplanning){
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

    $scope.getByTuinEnWeekWeekplanning = function(weekplanning){
      Data.get('weekplanningen/weekentuin/' + weekplanning.tuin + "/" + weekplanning.weeknr).then(function(result){
        console.log(weekplanning.tuin);
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
    $scope.selected= $scope.getWeeknumber(w) +"-"+ w.getFullYear();
}



dt = new Date();
var w = $scope.getWeeknumber(dt) +"-"+dt.getFullYear();
$scope.selected=w;
                      Data.get('weekplanningen/week/' + w).then(function(result)
                  {
                      $scope.weekplanningen = result.data;
                  });
$scope.weekje = [
{text: $scope.getWeeknumber(dt)+"-"+dt.getFullYear(), predicate: $scope.getWeeknumber(dt), sortable:true, dataType:"number"}
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

 $scope.columnsOogst = [
                    {text:"Weeknr",predicate:"Weeknr",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Mensen nodig",predicate:"Mensen nodig",sortable:true,dataType:"number"},
                    {text:"Mensen beschikbaar",predicate:"Mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];

 $scope.columnsDieven = [
                    {text:"Weeknr",predicate:"Weeknr",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Mensen nodig",predicate:"Mensen nodig",sortable:true,dataType:"number"},
                    {text:"Mensen beschikbaar",predicate:"Mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];


 $scope.columnsBladknippen = [
                    {text:"Weeknr",predicate:"Weeknr",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Mensen nodig",predicate:"Mensen nodig",sortable:true,dataType:"number"},
                    {text:"Mensen beschikbaar",predicate:"Mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];

 $scope.columnsSnoeien = [
                    {text:"Weeknr",predicate:"Weeknr",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Mensen nodig",predicate:"Mensen nodig",sortable:true,dataType:"number"},
                    {text:"Mensen beschikbaar",predicate:"Mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];

 $scope.columnsZakken = [
                    {text:"Weeknr",predicate:"Weeknr",sortable:true,dataType:"number"},
                    {text:"Tuin",predicate:"Tuin",sortable:true,dataType:"number"},
                    {text:"Aantal planten",predicate:"Aantal planten",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Mensen nodig",predicate:"Mensen nodig",sortable:true,dataType:"number"},
                    {text:"Mensen beschikbaar",predicate:"Mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];

 $scope.columnsVerpakking = [
                    {text:"Weeknr",predicate:"Weeknr",sortable:true,dataType:"number"},
                    {text:"Verwacht KG",predicate:"Verwacht KG",sortable:true,dataType:"number"},
                    {text:"Norm",predicate:"Norm",sortable:true,dataType:"number"},
                    {text:"Mensen nodig",predicate:"Mensen nodig",sortable:true,dataType:"number"},
                    {text:"Verwachte uren",predicate:"Verwachte uren",sortable:true,dataType:"number"},
                    {text:"Verwachte Pallets",predicate:"Aantal mensen nodig",sortable:true,dataType:"number"},
                    {text:"Aantal mensen beschikbaar",predicate:"Aantal mensen beschikbaar",sortable:true,dataType:"number"},
                    {text:"Resultaat norm",predicate:"Resultaat norm",sortable:true,dataType:"number"},
                    {text:"Resultaat pallets",predicate:"Resultaat pallets",sortable:true,dataType:"number"},
                    {text:"Resultaat uren",predicate:"Resultaat uren",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                   
                ];

 $scope.columnsOverige = [
                    {text:"Nog in te vullen",predicate:"Nog in te vullen",sortable:true,dataType:"number"},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
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
