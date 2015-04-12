/**
 * Created by burhan.cokca on 2/8/15.
 */

'use strict';
var apiServices = angular.module('apiServices',[]);


function getUrl(){
  return 'http://ec2-52-11-151-82.us-west-2.compute.amazonaws.com:3000';
  //return 'http://localhost:3000';
}


apiServices.factory("deviceService", function( $http) {

  return ({
    getUserByDeviceId: function(device_id){
      return $http({method: "get", url: getUrl() +  "/api/v1/patient/device/" + device_id});
    },
    getPatients: function(){
      return $http({method: "get", url: getUrl() +  "/api/v1/patient"});
    }

  });


});

apiServices.factory("currentUser", function( $cookieStore) {

  return ({
    get: function(){
      return $cookieStore.get('currentUser-fallarm');
    },
    put: function(user){
      $cookieStore.put('currentUser-fallarm', user);
    },
    remove: function(){
      $cookieStore.remove('currentUser-fallarm');
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
