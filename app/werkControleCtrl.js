app.controller('werkControleCtrl', function ($scope, $modal, $filter, Data) {
    $scope.controle = {};
$scope.dataKeus ="Datum";
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
    $scope.controle.datum = today;

          Data.get('controles/datum/'+today).then(function(result)
          {
               $scope.controles = result.data;
          });
    $('#datumControle').keypress(function (e) 
      {         
        if (e.keyCode == 13) 
        {
            var d = $("#datumControle").val();
              Data.get('controles/datum/' +d).then(function(result)
          {
               $scope.controles = result.data;
               Data.toast(result);
          });
        }
    });

        $('#tuinControleOogst').keypress(function (e) 
      {         
        if (e.keyCode == 13) 
        {
            var d = $("#tuinControleOogst").val();
              Data.get('controles/tuinOogst/' +d).then(function(result)
          {
               $scope.controles = result.data;
               Data.toast(result);
          });
        }
    });

    $('#AllControle').keypress(function (e) 
      {         
        if (e.keyCode == 13) 
        {
              Data.get('controles/all').then(function(result)
          {
               $scope.controles = result.data;
               Data.toast(result);
          });
        }
    });
  $scope.getControleDatum = function(controle)
  {
              Data.get('controles/datum/' +controle.datum).then(function(result)
          {
               $scope.controles = result.data;
               Data.toast(result);
          });
  }

    $scope.getControleTuin = function(controle)
  {
              Data.get('controles/tuinOogst/' +controle.tuinOogst).then(function(result)
          {
               $scope.controles = result.data;
               Data.toast(result);
          });
  }   

    $scope.getControleAll = function()
  {
              Data.get('controles/all').then(function(result)
          {
               $scope.controles = result.data;
               Data.toast(result);
          });
  }     
    $scope.open = function (p,size) {
      getRandomInt(1000,1400);
        var modalInstance = $modal.open({
          templateUrl: 'partials/werkControleEdit.html',
          controller: 'werkControleEditCtrl',
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
                $scope.controles.push(selectedObject);
                $scope.controles = $filter('orderBy')($scope.controles, 'id', 'reverse');

            }else if(selectedObject.save == "update"){
                        p.id = selectedObject.id;
            }
        });
    };
$scope.filterData = function(){
$scope.controles = null;

}
    function getRandomInt(min, max) {
 $scope.controle.rijOogst= Math.floor(Math.random() * (max - min + 1) + min);
}
 $scope.columns = [
                    {text:"Datum",predicate:"Datum",sortable:true,dataType:"date"},
                    {text:"Rij",predicate:"Rij",sortable:true},
                    {text:"Tuin",predicate:"Tuin",sortable:true},
                    {text:"Teveel hangen",predicate:"teveel hangen",sortable:true},
                    {text:"Beschadiging tomaat",predicate:"Beschadiging tomaat",sortable:true},
                    {text:"Beschadiging gewas",predicate:"Beschadiging gewas",sortable:true},
                    {text:"Opmerking",predicate:"Beschadiging gewas",sortable:true},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];
});


app.controller('werkControleEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.controle = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk controle' : 'Voeg controle toe';
        $scope.buttonText = (item.id > 0) ? 'Sla controle op' : 'Voeg nieuwe controle toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.controle);
        }
        $scope.saveControle = function (controle) {
            if(controle.id > 0){
                Data.put('controles/'+controle.id,controle).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(controle);
                        x.save = 'update';
                        Data.toast(result);
                        $modalInstance.close(x);
                    }else{
                        Data.toast(result);
                    }
                });
            }else{
                Data.post('controles', controle).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(controle);
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