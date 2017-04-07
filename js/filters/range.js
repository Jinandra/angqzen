'use strict';
angular.module("MainApp")
//create numeric array to ng-repeat
.filter('range', function() {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});