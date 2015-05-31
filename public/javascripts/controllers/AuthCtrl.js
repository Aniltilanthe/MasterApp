app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

//_______________________________________
  $scope.register = function(){
    if($scope.user.type && $scope.user.type === "USER") {
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    }

    else if($scope.user.type && $scope.user.type === "PHYSICIAN") {
      auth.registerPhysician($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('physicianHome');
      });
    }
  };
//_________________________________________
  $scope.logIn = function(){
    if($scope.user.type && $scope.user.type === "USER") {
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    }

    else if($scope.user.type && $scope.user.type === "PHYSICIAN") {
      auth.loginPhysician($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('physicianHome');
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
