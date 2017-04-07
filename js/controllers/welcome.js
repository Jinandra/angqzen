'use strict';
// Home Loan Boxes && Loan Status Page
angular.module("MainApp")
    .controller('WelcomeCtrl', function ($scope, $http, $window, $location, localStorage) {
        var storeName = 'LoginCtrl.user';
        var showStore = function () {
            $scope.store = localStorage.retrieve(storeName);
        };
        showStore();
        if (angular.isDefined($scope.store) && ($location.path() === "/welcome" || $location.path() === "/")) {
            $location.path("/user");
        }
    });
