'use strict';
// Home Loan Status Page
+angular.module("MainApp")
    .controller('UserLoanPaymentCtrl', function ($scope, $http, $routeParams, $rootScope, $timeout, $window, $location, localStorage, API_URL, $q, UserService) {
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
            var contractId = sessionStorage.getItem("ContractID");
            $scope.loanstatus = {};
            $scope.loanstatus.vehicle = sessionStorage.getItem("LoanVehicle");
            if (!contractId) {
                contractId = "";
            }
            if (token != null) {
                //Payments Details
                var query = {method: 'GET', url:API_URL + "/Loan/GetPaymentsDetails", params: {ContractID: contractId}};
                $http.get('json/paymentdetailtabs.json')
                    .then(function (res) {
                        $scope.TabsCtrls = res.data;
                UserService.connectToApi(query, function(data){
                    $scope.quickfix = data;
                    angular.forEach($scope.quickfix.PaymentsItem, function (value, key) {
                        var tmp_date = value.InstallmentDate.split('-');
                        tmp_date = tmp_date[1] + '/' + tmp_date[0] + '/' + tmp_date[2];
                        value.InstallmentDate = new Date(tmp_date);

                        if (value.Status == 1) {
                            $scope.TabsCtrls[1].allvalue++;
                        }
                        else if (value.Status == 0) {
                            $scope.TabsCtrls[2].allvalue++;
                        }
                        $scope.TabsCtrls[0].allvalue++;
                    });
                });
                    });

                $scope.currentTab = 'one.tpl.html';
                $scope.onClickTab = function (TabsCtrls) {
                    $scope.currentTab = TabsCtrls.url;
                };
                $scope.isActiveTab = function (tabUrl) {
                    return tabUrl == $scope.currentTab;
                };

                $scope.class = "hyde";
                $scope.limit = 5;
                $scope.showhidetext = "SHOW MORE";
                $scope.changeClass = function () {
                    if ($scope.class === "show") {
                        $scope.showhidetext = "SHOW MORE";
                        $scope.class = "hyde";
                        $scope.limit = 5;
                    }
                    else {
                        $scope.class = "show";
                        $scope.showhidetext = "SHOW LESS";
                        $scope.limit = $scope.quickfix.PaymentsItem.length;
                    }
                };
            }
            else {
                $window.location.href = '#/login';
            }
        }

    });

