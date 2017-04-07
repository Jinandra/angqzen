'use strict';
// User Login Page
angular.module("MainApp")
    .controller('LoginCtrl', function ($scope, $http, $rootScope, $filter, $window, $location, localStorage, API_URL, $translate) {
        $scope.errorclass = false;
        $scope.PinchangeBtn = true;
        $scope.PinchangeFormShow = true;
        $scope.loginButtons = "submit";

        var tokenKey = 'accessToken';
        var storeName = 'LoginCtrl.user';
        $scope.storeName = storeName;
        $scope.user = {};
        $scope.login = function () {

            $scope.loginButtons = "loading";

            var user = {
                PersonalID: $scope.user.id,
                Pin: $scope.user.pin
            };

            var responses = $http({
                method: "post",
                url: API_URL + "/Account/Login",
                data: JSON.stringify(user),
                dataType: "json"
            });
            responses.success(
                function (result) {

                    if (result.OK) {
                        $scope.loginButtons = "success";
                        $scope.PinchangeBtn = true;
                        $scope.PinchangeFormShow = true;



                        $rootScope.userName = result.CustomerName;
                        $rootScope.id = result.id;
                        sessionStorage.setItem(tokenKey, result.Token);
                        $rootScope.img = result.Image;
                        //LocalStorage
                        var logoutbutton = 'user';
                        //var tempstore = ["Demo User", "456654654654", result.Image, logoutbutton];
                        var tempstore = [result.CustomerName + " "+ result.SurName , user.PersonalID , result.Image, logoutbutton, result.Email];
                        localStorage.save(storeName, tempstore);
                        //
                        $rootScope.navigateto = '#/user';
                        //$window.location.href = '#/home';
                        dataLayer.push({'event': 'formSubmit','eventCategory':'loginFrom','eventAction':'login','eventLabel':'success','userId' : user.PersonalID});
                        $location.path('/home');
                    } else {

                        $scope.errorMessage = "Login Failed. The user is not registered. Please activate your account.";
                        if (result.IsAccountActive) {
                            $scope.errorMessage = "Please verify your e-mail before login";
                        }

                        if (result.IsPinWrong) {
                            $scope.errorMessage = "Login Failed, This Id / PIN combination is not valid.";
                        }
                        $scope.loginButtons="submit";
                        $scope.PinchangeBtn = true;
                        $scope.PinchangeFormShow = true;
                        $scope.errorclass = true;
                        dataLayer.push({'event': 'formSubmit','eventCategory':'loginForm','eventAction':'error','eventLabel':$scope.errorMessage});
                        $rootScope.userName = '';
                        $rootScope.id = '';
                        $rootScope.img = 'login_user_img.png';
                        $rootScope.navigateto = '#/login';
                        $window.location.href = '#/login';
                    }

                }
            );
            responses.error(function(result){
                $scope.errorclass = true;
                $scope.loginButtons="submit";
                $scope.errorMessage = "Internal Server Error. Please wait.";
                dataLayer.push({'event': 'formSubmit','eventCategory':'ServerError','eventAction':'error','eventLabel':$scope.errorMessage});
            });

            showStore();
        };
        $scope.savedUserBtn = "login";
        $scope.savedUserLogin = function () {
            $scope.errorclass = false;
            $scope.errorMessage = "";

            $scope.savedUserBtn = "loading";
            var savedUser = {
                PersonalID: $scope.store[1],
                Pin: $scope.savedUser.pin
            };
            var responses = $http({
                method: "post",
                url: API_URL + "/Account/Login",
                data: JSON.stringify(savedUser),
                dataType: "json"
            });
            responses.success(
                function (result) {
                    if (result.OK) {
                        sessionStorage.setItem(tokenKey, result.Token);
                        dataLayer.push({'event': 'formSubmit','eventCategory':'savedUser','eventAction':'savedUser','eventLabel':'success','userId' : savedUser.PersonalID});
                        $window.location.href = '#/home';

                        $scope.savedUserBtn = "";
                    } else {

                        $scope.errorclass = true;
                        $scope.savedUserBtn = "login";
                        $scope.errorMessage = "Invalid PIN please re-enter.";
                        dataLayer.push({'event': 'formSubmit','eventCategory':'savedUser','eventAction':'error','eventLabel':$scope.errorMessage});
                    }

                }
            );
            responses.error(function(result){
                $scope.errorclass = true;

                $scope.savedUserBtn = "login";
                $scope.errorMessage = "Internal Server Error. Please wait.";
                dataLayer.push({'event': 'formSubmit','eventCategory':'ServerError','eventAction':'error','eventLabel':$scope.errorMessage});
            })
        };
        $scope.clearStore = function () {
            localStorage.save(storeName, null);
            showStore();
            $window.location.href = '#/welcome';
        };
        var showStore = function () {
            $scope.store = localStorage.retrieve(storeName);
        };
        showStore();
        if (angular.isUndefined($scope.store) && $location.path() === "/user") {
            $location.path("/login");
        }
        if (angular.isDefined($scope.store) && $location.path() === "/login") {
            $location.path("/user");
        }
        $scope.logOut = function(){
            sessionStorage.clear();
        }

    });