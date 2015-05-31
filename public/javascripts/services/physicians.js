/* Physicians Service
* APIs
* to get list of physicians
* to get information about a physician
*/

app.factory('physicians', ['$http', 'auth', function($http, auth){
  var physician = {
    listOfPhysicians: [],
    currentPhysician: {}
  };

  physician.getAll = function() {
    return $http.get('/physicians').success(function(data){
      angular.copy(data, physician.listOfPhysicians);
    });
  };

  physician.get = function(physicianName) {
    if (physicianName !== null && physicianName !== undefined) {
      return $http.get('/physicians/' + physicianName + '/home').then(function(res) {
        angular.copy(res.data, physician.currentPhysician);
        return res.data;
      });
    } else {
      console.log("username passed is :" + physicianName + ". Pass a valid username");
    }
  };

  return physician;
}]);
