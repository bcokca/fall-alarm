/**
 * Created by burhan.cokca on 2/8/15.
 */

'use strict';
var apiServices = angular.module('apiServices',[]);


function getUrl(){
  return 'http://localhost:3000';
}


apiServices.factory("deviceService", function( $http) {

  return ({
    getUserByDeviceId: function(device_id){
      return $http({method: "get", url: getUrl() +  "/api/user/device/" + device_id});
    }

  });


});

apiServices.factory("loginService", function( $rootScope) {

    return({
      loggedin: function () {
        if($rootScope.user){
          return {name:'burhan', email:'bcokca@gmail.com'};
        }else{
          return false;
        }


      },
      login: function (email, password) {
        return {name:'burhan', email:'bcokca@gmail.com'};
      },
      logout: function () {
        return {name:'burhan', email:'bcokca@gmail.com'};
      },
      register: function (member) {
        return {name:'burhan', email:'bcokca@gmail.com'};
      }

    });
  }
);
