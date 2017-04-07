'use strict';
// Home Loan Status Page
+angular.module("MainApp")
    .controller('UserLoanParticipantsCtrl', function ($scope, $http, $routeParams, $rootScope, $timeout, $window, $location, localStorage, API_URL, $q, UserService, $modal) {
        var storeName = 'LoginCtrl.user';
        var tokenKey = 'accessToken';
        var query;
        $scope.loanParticipants = true;
        var showStore = function () {
            $scope.store = localStorage.retrieve(storeName);
        };
        showStore();
        $scope.userDetails = {};
        $scope.userDetails.notEditableUsers = [];
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
            var personalId = $scope.store[1];
            if (token != null) {
                //PersonalDetails
                query = {method: 'post', url:API_URL + "/Participant/GetPersonalDetails",  data: JSON.stringify({PersonalId: personalId, ContractID: contractId}), dataType: "json"};
                UserService.connectToApi(query, function(data){
                    $scope.loanParticipants = false;
                    $scope.personalDetails = data;
                    angular.forEach($scope.personalDetails.Participants, function (value, key) {
                        if (value) {
                            if (value.IsActive) {
                                $scope.userDetails.editableUser = $scope.personalDetails.Participants[key];
								
                            }
                            else if (!value.IsActive) {
                                $scope.userDetails.notEditableUsers.push($scope.personalDetails.Participants[key]);
                            }
                        }

                    })
                });
            }
            else {
                $window.location.href = '#/login';
            }
        }
        $scope.showMethod={};
        $scope.showBtn = function(method){
            $scope.showMethod[method] = false;
        };

        //function for update Email, Phone, Mobile
        $scope.updateDetails = function (data, method) {
            $scope.showMethod[method] = true;
            $scope.contact = {};
            $scope.contact[method] = "loading";
            var d = $q.defer();

            if(method!= "Email" && data==""){
                d.resolve('');
            }
            var newDetails = {
                PersonalId: personalId
            };
            if (data) {
				if (data !== $scope.userDetails.editableUser[method]){
                newDetails[method] = data;
                query = {method: 'post', url:API_URL + "/Participant/Post" + method,  data: JSON.stringify(newDetails), dataType: "json"};
                UserService.connectToApi(query, function(res){
                    if (res.OK) {
                        $scope.contact[method] = "success";
                        dataLayer.push({'event': 'formSubmit','eventCategory':'editableForm','eventAction':'editable','eventLabel':'success'});
                        d.resolve();
                        $timeout(function () {
                            $scope.contact[method] = "";
                        }, 2000);
                    }
                    else {
                        $scope.contact[method] = "error";
                        dataLayer.push({'event': 'formSubmit','eventCategory':'editableForm','eventAction':'error','eventLabel':'error'});
                        $timeout(function () {
                            $scope.contact[method] = "";
                        }, 2000);
                        d.resolve('');
                    }
                }); 
			  	} else {
					$scope.contact[method] = "success";
                        dataLayer.push({'event': 'formSubmit','eventCategory':'editableForm','eventAction':'editable','eventLabel':'success'});
                        d.resolve();
                        $timeout(function () {
                            $scope.contact[method] = "";
                        }, 2000);
				}

            } else {
                $scope.contact[method] = "error";
                $timeout(function () {
                    $scope.contact[method] = "";
                }, 2000);
                d.resolve('');
            }
            return d.promise;
        };

        //function for update Address
        $scope.saveUser = function (data) {
            data.PersonalId = personalId;
            var d = $q.defer();
            $scope.showMethod.Address= true;
            $scope.contactAddress = "loading";
            query = {method: 'post', url:API_URL + "/Participant/PostAddress",  data: JSON.stringify(data), dataType: "json"};
            UserService.connectToApi(query, function(res){
                $scope.loadingForm = false;
                if (res.OK) {
                    d.resolve();
                    $scope.contactAddress = "success";
                    dataLayer.push({'event': 'formSubmit','eventCategory':'editableForm','eventAction':'editable','eventLabel':'success'});
                    $timeout(function () {
                        $scope.contactAddress = "";
                    }, 2000);
                }
                else {
                    $scope.contactAddress = "error";
                    dataLayer.push({'event': 'formSubmit','eventCategory':'editableForm','eventAction':'error','eventLabel': $scope.contactAddress });
                    $timeout(function () {
                        $scope.contactAddress = "";
                    }, 2000);
                    d.resolve('');
                }
            });
            return d.promise;
        };

        //function for upload photo
     /*   $scope.uploadPhoto = function (e, reader, file, rawFiles, fileObjects, fileObj) {
			
            var img = document.createElement("img");
            img.src = "data:image/png;base64," + fileObj.base64;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 192;
            var MAX_HEIGHT = 192;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            var dataurl = canvas.toDataURL();
            dataurl = dataurl.replace(/^data:image\/(png|jpg);base64,/, "");
            query = {method: 'post', url:API_URL + "/Participant/PostImage", data: JSON.stringify({PersonalId: personalId, Base64ImageString: fileObj.base64}), dataType: "json"};
            UserService.connectToApi(query, function(data){
                $scope.userDetails.editableUser.Base64ImageString = fileObj.base64;
                $scope.store[2] = fileObj.base64;
                localStorage.save(storeName, $scope.store);
            });
           };*/
		   
		$scope.uploadPhoto = function (e, reader, file, rawFiles, fileObjects, fileObj) {
			$scope.base64ImageString = fileObj.base64;
			//console.log($scope.base64ImageString);
            var img = document.createElement("img");
            img.src = "data:image/png;base64," + fileObj.base64;
            $scope.uploading = true;
            $timeout(function () {
                $scope.uploading = false;
                if (img.width > 300 && img.height > 300) {
                    if(img.width>700 || img.height>700){
                        console.log(img.width,img.height );
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);

                        var MAX_WIDTH = 700;
                        var MAX_HEIGHT = 700;
                        var width = img.width;
                        var height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        console.log(canvas.width, canvas.height);
                        var dataurl = canvas.toDataURL();
                        $scope.base64ImageString = dataurl.replace(/^data:image\/(png|jpg);base64,/, "");
                    }
                    $scope.open('photo-crop-popup');
                }
                else{
                    var query = {method: 'post', url:API_URL + "/Participant/PostImage", data: JSON.stringify({PersonalId: personalId, Base64ImageString: fileObj.base64}), dataType: "json"};
                    UserService.connectToApi(query, function(data){
                        $scope.userDetails.editableUser.Base64ImageString = fileObj.base64;
                        $scope.store[2] = fileObj.base64;
                        localStorage.save(storeName, $scope.store);
                    });
                }

            }, 3000);



		};
	
        $scope.animationsEnabled = true;

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/template/profile-modal.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    personalId: function () {
                        return personalId;
                    },
                    base64ImageString: function () {
                        //return $scope.userDetails.editableUser.Base64ImageString;
						return $scope.base64ImageString;
                    }
                }
            });

            modalInstance.result.then(function (Base64ImageString) {
                $scope.userDetails.editableUser.Base64ImageString = Base64ImageString;
                $scope.store[2] = Base64ImageString;
                localStorage.save(storeName, $scope.store);
            }, function () {
            });
			
			
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    });

