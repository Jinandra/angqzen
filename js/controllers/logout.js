'use strict';
angular.module("MainApp")
    .controller('logoutCtrl', function ($scope, $http, $window) {
    sessionStorage.clear();
    $window.location.href = '#/login';
});