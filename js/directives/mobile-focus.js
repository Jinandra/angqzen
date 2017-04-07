'use strict';
angular.module("MainApp")
    .directive('focusMe', function ($timeout, $parse, $window) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function (value) {
                    if (value == true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
                $window.onclick = function () {
                    var phoneNumber = hasClass(document.activeElement, "phone-number");
                    var selectedFlag = hasClass(document.activeElement, "selected-flag");
                    var mobileFocusOut = hasClass(document.activeElement, "mobile-focus-out");
                    var mobileSelect = hasClass(document.activeElement, 'iti-mobile-select');
                    if (!phoneNumber && !selectedFlag &&!mobileFocusOut &&!mobileSelect && scope.focused == true && (ngModel.$$rawModelValue == "" || ngModel.$$rawModelValue == undefined)) {
                        scope.focused = false;
                        scope.$apply();
                    }
                };

                var hasClass = function (element, className) {
                    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
                };
            }

        };
    });
