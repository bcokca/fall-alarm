/**
 * Created by burhan.cokca on 2/8/15.
 */


angular.module('webAppApp').controller('PatientsCtrl',
  function ($scope, $modal, $rootScope, $location, deviceService) {


    var init = function(){
    $scope.patientList = [];
      getPatients();
      $scope.items = ['item1', 'item2', 'item3'];


    }

  init();

  function getPatients(){
    deviceService.getPatients()
      .success(function(data){
        console.log('data',data);
        $scope.patientList = data.result;


      })
      .error(function(err){
        console.log('error occurred while getting patients information', err);
      })

  }




  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('webAppApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
