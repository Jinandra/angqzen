'use strict';
angular.module("MainApp")
.controller("blurCtrl", function ($scope) {
	$scope.open = function () {
		$scope.focused = true;
	  };
});