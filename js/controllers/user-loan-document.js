'use strict';
// Loan Documentation Page
angular.module("MainApp")
.controller('UserLoanDocumentCtrl', function($scope, $http, $rootScope, $window, $location, localStorage, API_URL, UserService) {
        var storeName = 'LoginCtrl.user';
        var tokenKey = 'accessToken';

        $scope.documentUrl = API_URL+"/Document/GETDocumentDetails?DocumentId=";

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
            if (token != null) {
                //Document List
                var query = {method: 'GET', url:API_URL + "/Document/GetDocumentList", params: {id: contractId}};
                UserService.connectToApi(query, function(data){
                    $scope.documents = data.DocumentList;
                });
                  }
            else {
                $window.location.href = '#/login';
            }
        }




});
