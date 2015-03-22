'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var init = function(){

      //user is already logged in return it to the main page
      if($rootScope.user){
        $location.path('/');
      }
    };

    init();

    $scope.login = function(){


      console.log('burdayim');

      $rootScope.user = {name:'burhan', email:'bcokca@gmail.com'}
      $location.path('/');
    }

  });
