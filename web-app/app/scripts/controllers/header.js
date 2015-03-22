'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('HeaderCtrl', function ($scope, $location) {


    $scope.getCurrentPath = function(){
      //console.log('current path ', $location.path())
      return $location.path();
    }

  });
