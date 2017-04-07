'use strict';
angular.module("MainApp")
// ActivateAccount
.controller('ActivateAccountCtrl', function ($scope, $http, $rootScope, $routeParams, $window, API_URL, $location) {
    var user = {
        token: $routeParams.token
    };

    var responses = $http({
        method: "post",
        //url: "http://xyz.com/api/ActivateAccount/Confirm",
        url: API_URL+"/Account/Confirm",
        data: JSON.stringify(user),
        dataType: "json"
    });
    responses.success(
        function (result) {
            if (result.OK) {
                $location.path('/login');
            } else {
                $location.path('/activate');
                $rootScope.confirmAccount = result.ErrorMessage;
            }

        }
    );

});