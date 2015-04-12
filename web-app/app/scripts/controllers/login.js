'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, currentUser) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var init = function(){

      //user is already logged in return it to the main page
      if(currentUser.get()){
        $location.path('/');
      }
    };

    init();

    $scope.login = function(){
      $scope.loginFailed = false;

      if($scope.username == 'admin' && $scope.password == 'admin'){

        console.log('password is correct');

        var user = {name:'burhan', email:'bcokca@gmail.com'};
        currentUser.put(user);

        $location.path('/');



      }else{
        $scope.loginFailed= true;
      }



    }

  });
