'use strict';
// User Login Page
angular.module("MainApp")
.controller('PinResetCtrl', function ($http, $scope, $window, API_URL, localStorage) {
        var storeName = 'ActivateCtrl.user';
    $scope.pinResetBtn = "submit";
    $scope.errorclass = false;

    this.pinreset = function () {
        var user = { Email: this.user.email, Id: this.user.id };
		
        $scope.pinResetBtn = "loading";
        $http({
            url: API_URL+"/Account/SendPin",
            method: "POST",
            data: JSON.stringify(user),
            dataType: "json"

        }).success(function (data) {
			
            if(data.OK)
            {
                dataLayer.push({'event': 'formSubmit','eventCategory':'pinResetForm','eventAction':'pinReset','eventLabel':'success'});
                var activatetempstore =[data.OK,data.Email];
                localStorage.actsave(storeName, activatetempstore);
               $window.location.href = '#/active';
            }
            else
            {  $scope.pinResetBtn = "submit";
                $scope.errorclass = true;
                $scope.errorMessage = data.ErrorMessage;
                dataLayer.push({'event': 'formSubmit','eventCategory':'pinResetForm','eventAction':'error','eventLabel':$scope.errorMessage});
            }

        }).error(function(result){
            dataLayer.push({'event': 'formSubmit','eventCategory':'ServerError','eventAction':'error','eventLabel':'error'});
        });
    };
});

