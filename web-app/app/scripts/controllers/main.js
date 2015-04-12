'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('MainCtrl', function ($scope, deviceService, $location, currentUser) {


    function init(){
      console.log('currentUser', currentUser.get());

      if(!currentUser.get()){
        $location.path('/login');
      }

    }

    init();


    $scope.search = function(){
      $location.path('/patient/'+ $scope.device_id);
    }

  });
