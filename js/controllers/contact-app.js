'use strict';
// Contact App Page
angular.module("MainApp")
    .controller('ContactAppCtrl', function ($scope, $http, API_URL, $timeout, $location, localStorage,$window, UserService) {
        var storeName = 'LoginCtrl.user';
        var tokenKey = 'accessToken';
        var personalDetails;
        var query;
        $scope.supportSend = "send";
        var showStore = function () {
            $scope.store = localStorage.retrieve(storeName);
        };
        showStore();
        if (angular.isUndefined($scope.store)) {
            $location.path("/login");
        } else {
            var token = sessionStorage.getItem(tokenKey);
            var contractId = sessionStorage.getItem("ContractID");
            if (token != null) {
                query = {method: 'GET', url:API_URL + "/Contact/GETContactDetails/"};
                UserService.connectToApi(query, function(data){
                    $scope.reasons = data.contactReason;
                    $scope.contacts = data;
                    $scope.selections = [""];
                });
                // Contact App Form Loading effect
                $scope.loadingEmail = false;
                $scope.successSend = false;
                $scope.errorEmail = false;
                $scope.contact = [];
            }
            else {
                $window.location.href = '#/login';
            }
        }

        $scope.EmailSendStatus = function () {
            //$scope.loadingEmail = true;
            $scope.supportSend = "loading";
            var reason;
            if($scope.contact.selection && $scope.contact.selection.Reason){
              reason = $scope.contact.selection.Reason
            }
            query = {
                method: 'post', url: API_URL + "/Contact/SendSupportMessage",
                data: JSON.stringify({
                    ParticipantPersonalId: $scope.store[1],
                    ContactReason: reason,
                    Message: $scope.contact.message
                }),
                dataType: "json"
            };
            UserService.connectToApi(query, function(data){
                if (data.OK) {
                    $scope.supportSend = "saved";
                    // $scope.loadingEmail = false;
                    //$scope.successSend = true;
                    $scope.contact.message = "";
                    $scope.contact.selection="";
                    $timeout(function () {
                        $scope.supportSend = "send";
                    }, 4000);
                    dataLayer.push({'event': 'formSubmit','eventCategory':'contactApp','eventAction':'contact','eventLabel':'success'});

                } else
                    $scope.supportSend = "error";
                dataLayer.push({'event': 'formSubmit','eventCategory':'contactApp','eventAction':'error','eventLabel':$scope.supportSend});
                $timeout(function () {
                    $scope.supportSend = "send";
                }, 4000);
            });
        }

    });