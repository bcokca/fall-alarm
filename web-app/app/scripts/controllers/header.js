'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('HeaderCtrl', function ($scope, $location, currentUser) {

    function init(){
      //$scope.isUserLoggedIn =
      //console.log('$scope.isUserLoggedIn', $scope.isUserLoggedIn);
    }

    init();


    $scope.getCurrentPath = function(){
      //console.log('current path ', $location.path())
      return $location.path();
    };

    $scope.isUserLoggedIn = function(){
      if(currentUser.get()) return true;

      return false;

    }


    $scope.logout = function(){

      currentUser.remove();
      $location.path("/login");


    }

  });
