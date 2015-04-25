var app = angular.module('Medicos', ['ui.router']);

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
* MainCtrl - controller of our Posts tab
* Behavior:
*/

app.controller('MainCtrl', [
'$scope',
'physicians',
'auth',
function($scope, physicians, auth){
  
  $scope.listOfPhysicians = physicians.listOfPhysicians;

  $scope.isLoggedIn = auth.isLoggedIn;
}]);
