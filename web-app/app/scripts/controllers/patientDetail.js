/**
 * Created by burhan.cokca on 2/8/15.
 */


angular.module('webAppApp').controller('PatientDetailCtrl',
  function ($scope, $modal, $rootScope, $location, deviceService, $routeParams) {


    var init = function(){

      var device_id = $routeParams.device_id;

      //if user is not logged in return false
      /**if(!$rootScope.user){
        $location.path('/login');
      };
       **/

      deviceService.getUserByDeviceId(device_id)
        .success(function(data){

          console.log('user found ', data);
          if(data){
            $scope.patient = data.result[0];
            console.log('patient', $scope.patient);
          }

        })
        .error(function(err){
          console.log('error occurred while getting user by device id ',err );
        });




    };

  init();


});

