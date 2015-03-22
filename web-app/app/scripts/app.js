'use strict';

/**
 * @ngdoc overview
 * @name webAppApp
 * @description
 * # webAppApp
 *
 * Main module of the application.
 */
angular
  .module('webAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'apiServices',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: { user: userResolver }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: { user: userResolver }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/patients', {
        templateUrl: 'views/patients.html',
        controller: 'PatientsCtrl',
        resolve: { user: userResolver }
      })
      .when('/patient/:device_id', {
        templateUrl: 'views/patientDetail.html',
        controller: 'PatientDetailCtrl'
       // resolve: { user: userResolver }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var userResolver = function($q, $http, $rootScope, $location, loginService){

  var deferred = $q.defer();

  // already resolved
  //todo --go to use cookie instead of rootscope
  if($rootScope.user)
    deferred.resolve($rootScope.user);

  // first time
  else {

    $rootScope.user =  loginService.loggedin();
    deferred.resolve($rootScope.user);

    /*
    loginService.loggedin()
      .success(function(data, status, headers, config){
        if(data.status) {
          $rootScope.user = data.result;
          deferred.resolve($rootScope.user);
        }
        else {
          deferred.reject();
          $location.path("/login");
        }
      })
      .error(function(data, status, headers, config) {}); **/
  }

  return deferred.promise;
};
