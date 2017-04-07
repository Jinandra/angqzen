// Menu Slide Start	
'use strict';
angular.module("MainApp")
.controller('ModalError', function ($scope, $modal, $log) {
	$scope.items = ['item1', 'item2', 'item3'];

	$scope.animationsEnabled = true;
  
	$scope.open = function (size) {
  
	  	var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/template/modal_error.html',
			controller: 'ModalErrorInstance',
			size: size,
			resolve: {
		  		message: function () {
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
  
	$scope.toggleAnimation = function () {
	  $scope.animationsEnabled = !$scope.animationsEnabled;
	};
	 
});

angular.module("MainApp")
.controller('ModalErrorInstance', function ($scope, $window, $modalInstance, message, status, button) {
		$scope.errorMessage = message;
		$scope.errorStatus = status;
		$scope.errorButton = button;
  	$scope.ok = function () {
    	$modalInstance.close();
        $window.location.reload();
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
        $window.location.reload();
  	};
	 
});
