app.controller('NavCtrl', [
'$scope',
'auth',
'users',
function($scope, auth, users){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

  $scope.isUser = function() {
    return auth.isUser;
  }
  $scope.isPhysician = function() {
    return auth.isPhysician;
  }
}]);
