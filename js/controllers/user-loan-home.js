'use strict';
// Home Loan Boxes && Loan Status Page
angular.module("MainApp")
    .controller('UserLoanHomeCtrl', function ($scope, $http, $routeParams, $rootScope, $timeout, $window, $location, localStorage, API_URL, UserService) {
        var storeName = 'LoginCtrl.user';
        var tokenKey = 'accessToken';
        var showStore = function () {
            $scope.store = localStorage.retrieve(storeName);
        };
        showStore();
        if (angular.isUndefined($scope.store)) {
            $location.path("/login");
        } else {
            var token = sessionStorage.getItem(tokenKey);
            var personalId = $scope.store[1];
            if (token != null) {
                var ID = $rootScope.id;
                var query = {method: 'GET', url:API_URL + "/Loan/GetLoanList", params: {PersonalId: personalId}};
                UserService.connectToApi(query, function(data){
                    $scope.userloanhomes = data;
                });
            } else {
                $window.location.href = '#/login';
            }
            $scope.selectLoan = function(loanId, loanVehicle){
                sessionStorage.setItem("ContractID", loanId);
                sessionStorage.setItem("LoanVehicle", loanVehicle)
            };
        }
    });
