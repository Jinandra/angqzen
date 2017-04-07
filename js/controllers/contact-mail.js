'use strict';
// Contact Mail/Phone Page
angular.module("MainApp")
.controller('ContactMailCtrl', function($scope, $http, API_URL, UserService) {
    /*$http.get('json/contactmail.json')
        .then(function(res){
            $scope.ContactMails = res.data;
        });*/
        var tokenKey = 'accessToken';
        var token = sessionStorage.getItem(tokenKey);
        if (token != null) {
            var query = {method: 'GET', url:API_URL + "/Contact/GETContactDetails/"};
            UserService.connectToApi(query, function(data){
                $scope.contact  = data;
            });
        }
});
