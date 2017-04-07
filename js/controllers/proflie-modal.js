'use strict';
// Payment Status Tabes Start
angular.module('MainApp')
	.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  		$scope.animationsEnabled = true;

  		$scope.open = function (size) {
			console.log(size)

			var modalInstance = $modal.open({
			  	animation: $scope.animationsEnabled,
			  	templateUrl: 'partials/template/profile-modal.html',
			  	controller: 'ModalInstanceCtrl',
			  	size: size
			  	
			});

  		};

  		$scope.toggleAnimation = function () {
    		$scope.animationsEnabled = !$scope.animationsEnabled;
  		};

	});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('MainApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, UserService,API_URL, personalId, base64ImageString ) {
	$scope.personalId = personalId;
	$scope.base64ImageString = base64ImageString;

	$scope.uploadPhoto = function (e, reader, file, rawFiles, fileObjects, fileObj) {
			   $scope.base64ImageString = fileObj.base64;
	};

	$scope.$watch('imageCropResult', function(newVal) {
		if (newVal) {
			newVal = newVal.replace(/^data:image\/(png|jpg);base64,/, "");

			var query = {method: 'post', url:API_URL + "/Participant/PostImage", data: JSON.stringify({PersonalId: $scope.personalId, Base64ImageString: newVal}), dataType: "json"};
			UserService.connectToApi(query, function(data){
				$modalInstance.close(newVal);
			});
		}
	});

  	$scope.ok = function () {
    	$modalInstance.close();
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
});