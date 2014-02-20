var url = 'https://netzwerk.firebaseio.com';

var app = angular.module('greeter', [ 'ngRoute', 'firebase' ], function(
		$routeProvider) {
	$routeProvider.when('/register', {
		templateUrl : 'register.html',
		controller : RegisterCtrl
	});
	$routeProvider.otherwise({
		templateUrl : 'login.html',
		controller : LoginCtrl
	});
});

function GreeterMainViewCtrl($scope, $location, $rootScope, $firebaseSimpleLogin,
		$firebase) {
	var firebase = new Firebase(url);
	$rootScope.auth = $firebaseSimpleLogin(firebase);
	$scope.logout = function() {
		$rootScope.auth.$logout();
		$location.path('/login');
	};
}

function RegisterCtrl($scope, $location, $rootScope, $firebaseSimpleLogin,
		$firebase) {
	var firebase = new Firebase(url);
	$rootScope.auth = $firebaseSimpleLogin(firebase);
	$scope.register = function(username, password, confirmpassword) {
		if (password != confirmpassword) {
			$scope.errormsg = 'Passwörter stimmen nicht überein!';
		} else {
			$rootScope.auth.$createUser(username, password, false);
		}
		;
		$rootScope.$on('$firebaseSimpleLogin:error', function(e, err) {
			$scope.errormsg = "Registrieren fehlgeschlagen!";
		});
	};
}

function LoginCtrl($scope, $location, $rootScope, $firebaseSimpleLogin,
		$firebase) {
	var firebase = new Firebase(url);
	$rootScope.auth = $firebaseSimpleLogin(firebase);
	$scope.login = function(username, password) {
		$rootScope.auth.$login('password', {
			email : username,
			password : password
		}).then(function(user) {
			$scope.errormsg = null;
			$scope.password = null;
			$scope.email = null;
		}, function(evt, err) {
			$scope.errormsg = 'Login fehlgeschlagen!';
			$scope.password = null;
		});
	};
}