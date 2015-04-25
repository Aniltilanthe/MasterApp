app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

//_______________________________________
  $scope.register = function(){
    if($scope.user.type && $scope.user.type === "patient") {
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    }

    else if($scope.user.type && $scope.user.type === "physician") {
      auth.registerPhysician($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    }
  };
//_________________________________________
  $scope.logIn = function(){
    if($scope.user.type && $scope.user.type === "patient") {
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    }

    else if($scope.user.type && $scope.user.type === "physician") {
      auth.loginPhysician($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    }

  };
//_______________________________________
  $scope.isUserPhysician = function() {
    return (this.user.type === "physician") ? true : false;
  };
//_______________________________________
  $scope.specialities = [
    {speciality : "Psychiatry"},
    {speciality : "Urology"},
    {speciality : "Gynaecologist"}
  ];

  $scope.speciality = "Psychiatry";
//_______________________________________
}])
