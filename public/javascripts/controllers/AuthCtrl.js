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


$scope.signinCallback =  function(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);

  }
  $scope. request = gapi.client.plus.people.get({
  'userId' : 'me'
  })
};



}])
