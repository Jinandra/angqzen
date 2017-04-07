'use strict';
angular.module("MainApp")
//Mobile Number mask and placeholder
.directive('mobNumberPlaceholder', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs) {
            scope.focus2 = function () {
                scope.mobNumbplaceholder = "(+__) ___ ___________";
                //scope.mobNumbmask = "(+99) 999 99999999999";
            };
            scope.blur2 = function () {
                if (!scope.actvctrl.newuser.phone) {
                    scope.mobNumbplaceholder = undefined;
                }
            }
        }
    };
});