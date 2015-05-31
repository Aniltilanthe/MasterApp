app.factory('auth', ['$http', '$window', function($http, $window){
  var auth = {};

  auth.saveToken = function (token){
    $window.localStorage['medicos-user-token'] = token;
  };

  auth.getToken = function (){
    return $window.localStorage['medicos-user-token'];
  };

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.setCurrentUserType = function(payload) {
    if (payload && payload.type === "PHYSICIAN") {
      this.isPhysician = true;
      this.isUser = false;
    } else if (payload && payload.type === "USER") {
      this.isUser = true;
      this.isPhysician = false;
    }
  };

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      auth.setCurrentUserType(payload);

      return payload.username;
    }
  };

  auth.currentUserAllData = function() {
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      auth.setCurrentUserType(payload);

      return payload;
    }
  };

  auth.register = function(user){
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.registerPhysician = function(physician) {
    return $http.post('/registerPhysician', physician).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.loginPhysician = function(physician){
    return $http.post('/loginPhysician', physician).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('medicos-user-token');
  };

  return auth;
}])
