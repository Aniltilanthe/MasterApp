app.controller('PhysicianCtrl', [
'$scope',
'physicians',
'auth',
function($scope, physicians, auth){
  $scope.physician = physicians.currentPhysician;
}]);
