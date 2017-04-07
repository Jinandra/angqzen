'use strict';
angular.module("MainApp")
    .controller('BankAccCtrl', function($scope, $http, $filter, $window, $timeout, $routeParams, API_URL, UserService) {
    $scope.editBox = false;
    $scope.paymetEditBTN = true;
    $scope.confirmBTN = false;
    $scope.AccountCode = false;
            var query;
        var tokenKey = 'accessToken';
        var contractId = sessionStorage.getItem("ContractID");
        var ID = $routeParams.id;
        var token = sessionStorage.getItem(tokenKey);
        if(!contractId){
            contractId = "";
        }
        if (token != null) {
            var headers = {};
            if (token) {
                headers.Authorization = token;
            }
        }
        query = {method: 'GET', url:API_URL + "/Loan/GetBankDetails",  params: {ContractID: contractId}};
        UserService.connectToApi(query, function(data){
            $scope.jsondata = data;
            $scope.bankDetails = $scope.jsondata.BankAccount;
        });

    this.details = {
        id: ''
    };
    $scope.switchEditPayment = function(){
        $scope.changeBank = "accept";
        $scope.AccountCode = true;
    };
    $scope.OpenEditBox = function(){
        $scope.changeBank = "edit";
        $scope.editBox = true;
        $scope.paymetEditBTN = false;
    };
    $scope.CancelEditBox = function(){
        $scope.editBox = false;
        $scope.paymetEditBTN = true;
    };
    $scope.ConfirmChanges = function(){
    /*    $http({
            url: API_URL + "/Loan/POSTBankDetails",
            method: "post",
            data: JSON.stringify({ContractID: contractId, BankAccount: $scope.bac.details.id}),
            headers: headers,
            dataType: "json"
        })
            .success(function (data) {
                if (data.OK) {
                    $scope.confirmBTN = false;
                    $scope.success = true;
                    $scope.bac.details.id = "";
                    $scope.bankDetails = data.BankAccount;
                    $scope.AccountCode = false;
                }
        $timeout(function(){
            $scope.success = false;
            $scope.paymetEditBTN = true;
        }, 2000);
      });*/
    };
    this.checkacc = function(){
        $scope.changeBank = "loading";
        query = {method: 'POST', url:API_URL + "/Loan/POSTBankDetails", data: JSON.stringify({ContractID: contractId, BankAccount: $scope.bac.details.id}), dataType: "json"};
        UserService.connectToApi(query, function(data){
            if (data.OK) {
                $scope.changeBank = "success";
                $scope.confirmBTN = false;
                $scope.bankDetails = data.BankAccount;
                $scope.AccountCode = false;
                $timeout(function(){
                    $scope.changeBank = "";
                    $scope.bac.details.id = "";
                    $scope.paymetEditBTN = true;
                    $scope.editBox = false;
                }, 2000);
                dataLayer.push({'event': 'formSubmit','eventCategory':'editpayment', 'eventAction': 'payment','eventLabel':'success'});
            }
            else{
                $scope.AccountCode = false;
                $scope.changeBank = "error";
                $scope.paymetEditBTN = true;
                $scope.bac.details.id = "";
                dataLayer.push({'event': 'formSubmit', 'eventCategory':'editpayment','eventAction':'error', 'eventLabel':$scope.changeBank});
            }
        });
   /*     var result = $filter('filter')($scope.jsondata, {accountnumber:this.details.id}, true)[0];
        result = true;
        if(result){
            $timeout(function(){
                $scope.loading = false;
                $scope.success = false;
                $scope.error = false;
                $scope.editBox = false;
                $scope.confirmBTN = true;
                //$window.location.href = '#/payments';
            }, 800);
        }
        else{
            $timeout(function(){
                $scope.loading = false;
                $scope.error = true;
                $scope.success = false;
            }, 1300);
        }
        $timeout(function(){
            $scope.loading = false;
            $scope.success = false;
            //$scope.error = false;
        }, 3000);*/

    }
});
