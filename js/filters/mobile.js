'use strict';
angular.module("MainApp")
// Mobile Number Fromat Start Filter
    .filter('Mobile', function () {
    return function (Mobile) {
        if (!Mobile) { return ''; }
        var value = Mobile.toString().trim().replace(/^\+/, '');
        if (value.match(/[^0-9]/)) {
            return Mobile;
        }
        var country, city, number;
        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;
            default:
                city = value.slice(0, 2);
                number = value.slice(2);
        }
        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + ' ' + number.slice(3, 14);
            }
            else{
                number = number;
            }
            return ("(+" + city + ") " + number).trim();
        }
        else{
            return " " + city;
        }
    };
});
	