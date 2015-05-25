app.controller('UserCtrl', [
'$scope',
'users',
'auth',
function($scope, users, auth){
  $scope.user = users.getData();

  $scope.isEditable = false;

  $scope.user.dateOfBirth = new Date($scope.user.dateOfBirth);

  $scope.updateUserProfileDetails = function() {
    users.updateData(this.user);
  };

}]);
