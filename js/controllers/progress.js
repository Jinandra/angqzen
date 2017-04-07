'use strict';
angular.module("MainApp")
.controller("ProgressCtrl", function ($scope, $timeout) {

    //var amt = 66;
    //$scope.countTo = amt;
    $scope.countFrom = 0;
    $timeout(function () {
        $scope.progressValue = $scope.userloanhome.Percent;
    }, 200);
});