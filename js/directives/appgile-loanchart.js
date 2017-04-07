'use strict';
angular.module("MainApp")
//Matrix timeline
.directive('agileLoanchart', function ($http, $filter, API_URL, $routeParams) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl:'partials/template/loanchart.html',
        scope:true,
        link: function (scope, element, attrs) {
            scope.years=[];
            scope.$watch('matrix', function(){
                if(scope.matrix){
                    angular.forEach(scope.matrix, function(value, key){
                        var tmp_date = value.SettlementDate.split('-');
                        tmp_date = tmp_date[1]+'/'+tmp_date[0]+'/'+tmp_date[2];
                        value.SettlementDate = new Date(tmp_date);
                        //  console.log(value.SettlementDate);
                        // value.SettlementDate = new Date(value.SettlementDate);
                        if(scope.years.indexOf(value.SettlementDate.getFullYear()) === -1) {
                            scope.years.push(value.SettlementDate.getFullYear());
                        }
                    });
                }
            })
        }

    };
});