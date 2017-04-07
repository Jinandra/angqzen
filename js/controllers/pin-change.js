'use strict';
angular.module("MainApp")
    // Edit Pin Participant page Start
    .controller('PinChangeCtrl', function ($scope, $http, $filter, $window, $timeout, API_URL, UserService) {
    $scope.PinchangeBtn = true;
    $scope.PinchangeFormShow = true;
    $scope.loadingPin = false;
    $scope.successSave = false;
    $scope.PinSubmit = true;
    $scope.pinChange = "submit";
    $scope.Pin = {};
        var token = sessionStorage.getItem('accessToken');
       // console.log($scope.store);
       var personalId = $scope.store[1];
        var personalEmail = $scope.store[4];
        var personalName = $scope.store[0];
        if (token != null) {
           /* var headers = {};
            if (token) {
                headers.Authorization = token;
            }*/
        }
    $scope.PinBtnSwitch = function () {
        $scope.PinchangeBtn = false;
        $scope.PinchangeFormShow = false;
        $scope.PinSubmit = true;
        $scope.pinChange = "submit";
    };
    $scope.PinSaveSwitch = function () {
        $scope.PinSubmit = false;
        $scope.pinChange = "loading";
       $scope.loadingPin = true;
        var query = {method: 'post', url:API_URL + "/Participant/PostChangePIN", data: JSON.stringify({PersonalId: personalId, Pin: $scope.Pin.new, Email:personalEmail, UserName:personalName}),  dataType: "json"};
        UserService.connectToApi(query, function(data){
            if(data.OK)
            {
                $scope.pinChange = "success";
                $scope.loadingPin = false;
                $scope.successSave = true;
                dataLayer.push({'event': 'formSubmit','eventCategory':'PinChangeForm','eventAction':'PinChange','eventLabel':'success'});
            }
            else{
                dataLayer.push({'event': 'formSubmit','eventCategory':'PinChangeForm','eventAction':'error','eventLabel':'error'});
            }
        });
        $timeout(function () {
                $scope.PinchangeBtn = true;
                $scope.PinchangeFormShow = true;
                $scope.successSave = false;
            }, 3000);

    };
    $scope.PinCancelSwitch = function () {
        $scope.PinchangeBtn = true;
        $scope.PinchangeFormShow = true;
        $scope.Pin.new = null;
        $scope.Pin.confirm = null;
        $scope.PinChangeForm.$setPristine();
    };


});