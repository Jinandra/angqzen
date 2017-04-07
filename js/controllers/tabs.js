'use strict';
// Payment Status Tabes Start
angular.module("MainApp")
    .controller('TabsCtrl', function ($scope, $http, $routeParams, API_URL) {
        var tokenKey = 'accessToken';
        var token = sessionStorage.getItem(tokenKey);
        if (token != null) {
            var headers = {};
            if (token) {
                headers.Authorization = token;
            }
        }
        var contractId = sessionStorage.getItem("ContractID");
        if(!contractId){
            contractId = "";
        }
        var paymentsItem;

        //$http.get('json/paymentdetail.json')
        $http.get('json/paymentdetailtabs.json')
            .then(function (res) {
                $scope.TabsCtrls = res.data;
                    $http({
                        url: API_URL + "/Loan/GetPaymentsDetails",
                        method: "GET",
                        params: {ContractID: contractId},
                        headers: headers
                    })
                        .then(function (res) {
                            paymentsItem = res.data.PaymentsItem;
                            angular.forEach(paymentsItem, function (value) {
                                if (value.Status == 1) {
                                    $scope.TabsCtrls[1].allvalue++;
                                }
                                else if (value.Status == 0) {
                                    $scope.TabsCtrls[2].allvalue++;
                                }
                                $scope.TabsCtrls[0].allvalue++;
                            })

                        });
            });
        $scope.currentTab = 'one.tpl.html';
        $scope.onClickTab = function (TabsCtrls) {
            $scope.currentTab = TabsCtrls.url;
        };
        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    });
