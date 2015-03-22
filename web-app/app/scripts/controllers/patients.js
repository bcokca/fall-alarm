/**
 * Created by burhan.cokca on 2/8/15.
 */


angular.module('webAppApp').controller('PatientsCtrl', function ($scope, $modal, $rootScope, $location) {


    var init = function(){

      //if user is not logged in return false
      if(!$rootScope.user){
        $location.path('/login');
      };

      $scope.patientList = [
        {id:'1', name:'John', lastname: 'Davis', device_id: '1'},
        {id:'2',name:'Mike', lastname: 'Davis', device_id: '2'},
        {id:'3',name:'Geremy', lastname: 'Davis', device_id: '3'},
        {id:'4',name:'John', lastname: 'Davis', device_id: '4'},
        {id:'5',name:'John', lastname: 'Davis', device_id: '5'},
        {id:'6',name:'John', lastname: 'Davis', device_id: '6'}
      ]

      $scope.items = ['item1', 'item2', 'item3'];


    }

  init();




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
