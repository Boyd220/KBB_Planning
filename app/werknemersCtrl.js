app.controller('werknemersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.werknemer = {};
    Data.get('werknemers').then(function(data){
        $scope.werknemers = data.data;
    });
    $scope.deleteWerknemer = function(werknemer){
        if(confirm("Weet u zeker dat u de werknemer wilt verwijderen?")){
            console.log($scope.werknemers);
            Data.delete("werknemers/"+werknemer.id).then(function(result){
                $scope.werknemers = _.without($scope.werknemers, _.findWhere($scope.werknemers, {id:werknemer.id}));
                console.log($scope.werknemers);
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/werknemersEdit.html',
          controller: 'werknemersEditCtrl',
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
                $scope.werknemers.push(selectedObject);
                $scope.werknemers = $filter('orderBy')($scope.werknemers, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.werknemersnummer = selectedObject.werknemersnummer;
                p.achternaam = selectedObject.achternaam;
                p.voornaam = selectedObject.voornaam;
                p.tel = selectedObject.tel;;
                p.comments = selectedObject.comments;
            }
        });
    };
    
 $scope.columns = [
                    {text:"Nummer",predicate:"Nummer",sortable:true,dataType:"number"},
                    {text:"Achternaam",predicate:"Achternaam",sortable:true},
                    {text:"Voornaam",predicate:"Voornaam",sortable:true},
                    {text:"Telefoonnummer",predicate:"Telefoonnummer",sortable:true},
                    {text:"Opmerkingen",predicate:"Opmerkingen",sortable:true},
                    {text:"Bewerkingen",predicate:"Bewerkingen",sortable:false}
                ];

});


app.controller('werknemersEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.werknemer = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Afsluiten');
        };
        $scope.title = (item.id > 0) ? 'Bewerk werknemer' : 'Voeg werknemer toe';
        $scope.buttonText = (item.id > 0) ? 'Sla bewerking op' : 'Voeg nieuwe werknemer toe';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.werknemer);
        }
        $scope.saveWerknemer = function (werknemer) {
            werknemer.uid = $scope.uid;
            if(werknemer.id > 0){
                Data.put('werknemers/'+werknemer.id, werknemer).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(werknemer);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('werknemers', werknemer).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(werknemer);
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
