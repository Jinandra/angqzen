'use strict';

angular.module("MainApp")
    .factory('UserService',['$http', '$location','$rootScope','$modal', '$timeout',
        function ( $http,$location,$rootScope, $modal, $timeout ){
            var service = {};
            var token;
			
            /*service.connectToApi = function (query, callback) {
                token = sessionStorage.getItem('accessToken');
                if(token){
                    query.headers = {'Authorization': token};
                }
                $http(query).success(function(data, status, headers){
                    if(data=="Session Expired"){
                        $location.path("/login");
                        sessionStorage.clear();
                    }
                    else{
                        callback(data, status, headers);
                    }

                })

            };*/
			
			service.connectToApi = function (query, callback) {
				
				token = sessionStorage.getItem('accessToken');
                if(token){
                    query.headers = {'accessToken': token};
                }
                $http(query).success(function(data, status, headers){

                        callback(data, status, headers);

                }).error(function(data, status ){
                    if(status==401 || status==419){
                        $location.path("/login");
                        sessionStorage.clear();
                    }
                       console.log("error"); 
                       
					   /*var modalInstance = $modal.open({
						animation: true,
						templateUrl: 'partials/template/modal_error.html',
						controller: 'ModalErrorInstance',
						size: 'change-password',
						resolve: {
							message: function () {
								return "Message";
							},
							status: function () {
								return "Status";
							},
							button: function () {
								return "Understand";
							}
						}
					});*/
					callback(data);
                })
          
            };


            return service;
        }]);



