var app = angular.module('Medicos', ['ui.router', 'ui.bootstrap']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['physicians', function(physicians){
          return physicians.getAll();
        }]
      }
    });

  $stateProvider
    .state('userHome', {
      url: '/users/{username}/home',
      templateUrl: '/userHome.html',
      controller: 'UserCtrl',
      resolve: {
        postPromise: ['$stateParams','users', function($stateParams, users){
          return users.get($stateParams.username);
        }]
      }
    });

  $stateProvider
    .state('physicianHome', {
      url: '/physicians/{physicianName}/profile',
      templateUrl: '/physicianHome.html',
      controller: 'PhysicianCtrl',
      resolve: {
        post: ['$stateParams','physicians', function($stateParams, physicians){
          return physicians.get($stateParams.physicianName);
        }]
      }
    });

  $stateProvider
    .state('posts', {
      url: '/posts',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    });

  $stateProvider
    .state('post', {
      url: '/posts/{id}',
      templateUrl: '/aPost.html',
      controller: 'APostCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    });

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    });

  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);

/*
* Application Controllers
*/

app.controller('MainCtrl', [
'$scope',
'physicians',
'auth',
'users',
function($scope, physicians, auth, users){
  $scope.listOfPhysicians = physicians.listOfPhysicians;

  $scope.isLoggedIn = auth.isLoggedIn;

  $scope.user = auth.currentUserAllData();

  $scope.bookAnAppointment = function(physician) {
    var dateTime = new Date(physician.appointment.date.getFullYear(), physician.appointment.date.getMonth() , physician.appointment.date.getDate(),
      physician.appointment.time.getHours(), physician.appointment.time.getMinutes(), physician.appointment.time.getSeconds());
    //delete the appointment property as not needed for a physician object
    delete physician.appointment;
    //Book An appointment using users service
    users.bookAnAppointment(this.user, physician, dateTime);
  };

  //initialization
    $scope.isShowBody = false;

    $scope.hstep = 1;
    $scope.ismeridian = true;

    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };
}]);
