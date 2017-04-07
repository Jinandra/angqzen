'use strict';
angular.module("MainApp")
//Date of Birthday mask and placeholder
.directive('dobPlaceholder', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs) {
            scope.focus = function () {
                scope.placeholder = "dd/mm/yyyy";
                scope.mask = "99/99/9999";
            };
            scope.blur = function () {
                if (!scope.actvctrl.newuser.dob) {
                    scope.mask = undefined;
                }
            }
        }
    };
});