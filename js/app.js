(function () {
	var app = angular.module("MainApp", ["ui.bootstrap","countTo","ngIOS9UIWebViewPatch","ngRoute",'angular-svg-round-progress',"angular.directives-round-progress","ui.mask","xeditable","angularMoment","ngCleanMask","amplify", "naif.base64","ngAnimate", "LoadingBarExample", "pascalprecht.translate", 'internationalPhoneNumber', 'ngLocale', 'ImageCropper']).
	config( function ($routeProvider) {
	  $routeProvider.
	  	when("/",{
			templateUrl : "partials/welcome.html",
            controller  :  'WelcomeCtrl'
			})
		.when("/welcome",{
			templateUrl : "partials/welcome.html",
            controller  :  'WelcomeCtrl'
			})
	  	.when("/home",{
			templateUrl : "partials/home.html",
			controller  : 'UserLoanHomeCtrl'
			})
		.when("/activate",{
			templateUrl : "partials/activate-account.html",
			controller  : 'ActivateCtrl',
			controllerAs: 'actvctrl'
			})
		.when("/active",{
			templateUrl : "partials/active-account.html",
			controller  : 'ActivateCtrl'
			})
		.when("/emailpin",{
			templateUrl : "partials/pin-email.html",
			})
		.when("/createpin",{
			templateUrl : "partials/create-pin.html",
			})
		.when("/support",{
			templateUrl:"partials/contact-app.html",
			controller  : 'ContactAppCtrl'
			})
		.when("/contact-mail",{
			templateUrl:"partials/contact-mail.html",
			controller  : 'ContactMailCtrl'
			})
		.when("/login",{
			templateUrl:"partials/login.html",
			controller  : 'LoginCtrl'
			})
		.when("/user",{
			templateUrl:"partials/user-saved.html",
			controller: 'LoginCtrl'
			})
		.when("/pinreset",{
			templateUrl:"partials/pin-reset.html",
			controller  : 'PinResetCtrl',
			controllerAs:'pr'
			})
		.when("/register",{
			templateUrl:"partials/register.html",
			controller  : 'registerController'
			})
		.when("/loanstatus",{
			templateUrl:"partials/loan-status.html",
			controller: 'UserLoanStatusCtrl'
			})
		.when("/participants",{
			templateUrl:"partials/loan-participants.html",
			controller: 'UserLoanParticipantsCtrl'
			})
		.when("/payments",{
			templateUrl:"partials/loan-payment.html",
			controller: 'UserLoanPaymentCtrl'
			})
		.when("/editpayment/",{
			templateUrl:"partials/edit-payment.html",
			controller  : 'BankAccCtrl'
			})
		.when("/documents",{
			templateUrl:"partials/loan-doc.html",
			controller: 'UserLoanDocumentCtrl'
		})
          .when("/AccountActivate/:token", {
              templateUrl: "partials/AccountActivate.html",
              controller: 'ActivateAccountCtrl'
          })
		.otherwise({redirectTo:"/"});
	  })
		.config(function ($translateProvider) {
			var languagesSupport = ["en", "es", "pt"];
			var languages = [];
			if(navigator.languages)
			{	languages = navigator.languages.filter(function (language) {
				return languagesSupport.indexOf(language) !== -1;
				});
			}
			else if(navigator.language)
			{
				if(languagesSupport.indexOf(navigator.language)!==-1)
				{
					languages.push(navigator.language);
				}
			}

			if(languages.length>1){
				selectLanguage = languages[0];
			}
			else{
				selectLanguage = "en";
			}
			$translateProvider.useStaticFilesLoader({
				prefix: 'json/translate/locale-',
				suffix: '.json'
			});
			$translateProvider.preferredLanguage(selectLanguage);


})	.config(configLang)

	.constant('API_URL', 'https://xyz/api');
	configLang.$inject = ['moment'];

	/* @ngInject */
	function configLang(moment) {
		moment.locale(selectLanguage);
	}

	//	.constant('API_URL', 'http://180.207.40.187/PortalCliente');

	//LocalStorage
	 angular.module('amplify',[]).factory('localStorage', function () {
        'use strict';
        
        var save=function(name, data){
          amplify.store(name, data);
        };
		
		var actsave=function(name, data){
          amplify.store(name, data,{expires: 6000000});
        };
        
        var retrieve=function(name){
          return amplify.store(name);
        };
        
        var clearStore=function(name){
          return amplify.store(name, null);
        };
        
        return{
          save: save,
		  actsave : actsave,
          retrieve : retrieve,
          clearStore : clearStore
        }
      })

	app.run(function(editableOptions) {
	  	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});
	var selectLanguage;
   
})();
			