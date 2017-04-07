'use strict';
// Activate User Page
angular.module("MainApp")

.controller('ActivateCtrl', function ($scope, $http, $rootScope, $filter, $window, $location, localStorage, API_URL) {

    var storeName = 'ActivateCtrl.user';
    var showStore = function(){
        $scope.store = localStorage.retrieve(storeName);
    };
    showStore();
    if (angular.isUndefined($scope.store) && $location.path() === "/active") {
        $location.path("/activate");
    }

    this.newuser = [];
if($rootScope.confirmAccount){
    $scope.confirmAccountMessage=$rootScope.confirmAccount;
    $rootScope.confirmAccount = "";
}


    $scope.errorclass = false;
    $scope.errorclassemail = false;
    $scope.activateBtn = "submit";

    this.activate = function () {
        $scope.errorclassemail = false;
        $scope.errorclass = false;
        $scope.activateBtn = "loading";
        var string = this.newuser.dob;
        var month = string.substring(0, 2);
        var day = string.substring(3, 5);
        var year = string.substring(6, 10);
        var birthday = day + '/' + month + '/' + year;
        var newuser = {
            PersonalID: this.newuser.secondaryid,
            BirthDate: birthday,
            Mobile: $scope.fullPhoneNumber,
            Email: this.newuser.email
        };
        $scope.confirmAccountMessage = "";
        var responses = $http({
            method: "post",
            url: API_URL + "/Account/Post",
            data: JSON.stringify(newuser),
            dataType: "json"
        });
        responses.success(
            function (result) {

                if (result.OK) {
                    $scope.activateBtn = "success";
                    $rootScope.newUserEmail = result.Email;
                    dataLayer.push({'event': 'formSubmit','eventCategory':'activateaccount','eventAction': 'activate','eventLabel':'success'});
                    $window.location.href = '#/active';
                    var activatetempstore =[result.OK,result.Email];
                    localStorage.actsave(storeName, activatetempstore);
                } else {
                    $scope.activateBtn = "submit";
                    if (result.UserExist) {
                        $scope.errorclass = true;

                    }
                    if (result.IsEmailExist ||result.ErrorMessage ) {
                        $scope.errorclassemail = true;
                        $scope.errorMessage = result.ErrorMessage;
                    }
                  dataLayer.push({'event': 'formSubmit','eventCategory':'activateaccount','eventAction':'error','eventLabel':$scope.errorMessage});

                }

            }
        );
        responses.error(function(result){
            $scope.errorclassemail = true;
            $scope.errorMessage = "Please wait.";
            $scope.activateBtn = "submit";
            dataLayer.push({'event': 'formSubmit','eventCategory':'ServerError', 'eventAction':'error','eventLabel':$scope.errorMessage});
        });



    };


});
	