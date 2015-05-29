app.factory('users', ['$http', 'auth', function($http, auth){
  var o = {
    user: []
  };

  o.get = function(username) {
    return $http.get('/users/' + username + '/home', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res){
      angular.copy(res, o.user);
      return res.data;
    });
  };

  o.getData = function() {
    return o.user.data;
  };

  o.updateData = function(user) {
    var username = user.username;
    
    if (user && username !== null && username !== undefined) {
      return $http.post('/users/' + username + '/profile/update', user, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(res) {
        angular.copy(res, o.user);
      });
    }
    else {
      console.log("pass a valid username " + username + " & user object" + user);
    }
  };

  o.bookAnAppointment = function(user, physician, dateTime) {
    var username = user.username;
    var physicianName = physician.username;
    var data = {
      user : user,
      physician : physician,
      dateTime : dateTime
    };

    return $http.post('/users/' + username + '/bookAnAppointment/' + physicianName, data, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  return o;
}]);
