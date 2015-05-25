/* Physicians Service
* APIs
* to get list of physicians
* to get information about a physician
*/

app.factory('physicians', ['$http', 'auth', function($http, auth){
  var o = {
    listOfPhysicians: []
  };

  o.getAll = function() {
    return $http.get('/physicians').success(function(data){
      angular.copy(data, o.listOfPhysicians);
    });
  };

  return o;
}]);
