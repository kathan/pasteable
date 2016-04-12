var PasteApp = angular.module("PasteApp",[]);

PasteApp.controller('PasteCtrl', function ($scope, $http, $rootScope){
  $scope.grid_data = [];
  $scope.typed_text = 'Typed text: ';
  
  var s = pasteable({selectElement:'#my_element'});
  s.addEventListener('paste', function(e){
    var rows = e.detail.split(/\n/);
    for(var r in rows){
      var columns = rows[r].split(/\t/);
      $scope.grid_data.push(columns);
      $scope.$apply();
    }
  });
});