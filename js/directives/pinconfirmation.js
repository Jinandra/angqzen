'use strict';
angular.module("MainApp")
// Pin Confirmation    
.directive('validationCheck', ['$parse', function ($parse) {
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ngModel) {
			var check = $parse(attrs.validationCheck);

			// Watch for changes to this input
			scope.$watch(check, function (newValue) {
				ngModel.$setValidity(attrs.name, newValue);
			});
		}
	};
}]);