'use strict';
// Home Loan Status Page
angular.module("MainApp")
    .controller('UserLoanStatusCtrl', function ($scope, $http, $routeParams, $rootScope, $timeout, $window, $location, localStorage, API_URL, $q, UserService) {
        var storeName = 'LoginCtrl.user';
        var tokenKey = 'accessToken';
        $scope.loanParticipants=true;
        var showStore = function () {
            $scope.store = localStorage.retrieve(storeName);
        };
        showStore();
        $scope.userDetails = {};
        $scope.userDetails.notEditableUsers=[];
        if (angular.isUndefined($scope.store)) {
            $location.path("/login");
        } else {
            var token = sessionStorage.getItem(tokenKey);
            var contractId = sessionStorage.getItem("ContractID");
            if(!contractId){
                contractId = "";
            }
            if (token != null) {
                $scope.roundProgressData = {
                    label: "",
                    percentage: ""
                };
                var query = {method: 'GET', url:API_URL + "/Loan/GetLoanDetails", params: {ContractID: contractId}};
                UserService.connectToApi(query, function(data){
                    $scope.matrix = data.settlementmatrix;
                    $scope.loanstatus = data;

                    $scope.roundProgressData = {
                        label: $scope.loanstatus.Percent,
                        percentage: $scope.loanstatus.paidinstallemt / $scope.loanstatus.totalinstallemt
                    };

                    $scope.$watch('roundProgressData', function (newValue, oldValue) {
                        newValue.percentage = newValue.label / 100;
                    }, true);
                });
            }
            else {
                $window.location.href = '#/login';
            }
        }

     });
