'use strict';
angular.module("MainApp")
    .controller("CircleProgessCtrl", function ($scope, $timeout) {
    var amt = 66;
    $scope.countTo = amt;
    $scope.countFrom = 0;
    $timeout(function () {
        $scope.progressValue = amt;
    }, 200);
});