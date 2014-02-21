'use strict';

var url = 'https://netzwerk.firebaseio.com';
var taskUrl = url + '/tasks';

angular.module('greeter', [ 'ngRoute', 'firebase' ], function($routeProvider) {
	$routeProvider.when('/register', {
		templateUrl : 'register.html',
		controller : RegisterCtrl
	});
	$routeProvider.when('/login', {
		templateUrl : 'login.html',
		controller : LoginCtrl
	});
	$routeProvider.when('/newTask', {
		templateUrl : 'newTask.html',
		controller : NewTaskCtrl
	});
	$routeProvider.otherwise({
		templateUrl : 'newTask.html',
		controller : NewTaskCtrl
	});
}).factory('Auth', function($firebaseSimpleLogin, $rootScope) {
	var authbase = new Firebase(url);
	var auth = $firebaseSimpleLogin(authbase);

	var Auth = {
		register : function(email, password) {
			return auth.$createUser(email, password);
		},
		loggedIn : function() {
			return auth.user != null;
		},
		logout : function() {
			auth.$logout();
		},
		login : function(username, password) {
			return auth.$login('password', {
				email : username,
				password : password
			});
		},
		getUser : function() {
			return auth.user;
		}
	};
	$rootScope.loggedIn = function() {
		return Auth.loggedIn();
	};

	return Auth;
}).run(function($rootScope, $location, Auth) {
	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		$location.path('/login');
	});
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		console.log("changing route");
		console.log(Auth.getUser());
		if (!Auth.loggedIn()) {
			$location.path('/login');
		}
	});
});

function GreeterMainViewCtrl($scope, $location, $firebase, Auth) {
	$scope.logout = function() {
		Auth.logout();
		console.log('logging out...');
		$location.path('/login');
	};
	$scope.getUser = function() {
		return Auth.getUser();
	};
	var taskbase = new Firebase(taskUrl);
	$scope.tasks = $firebase(taskbase);
}

function NewTaskCtrl($scope, $rootScope, $firebase) {

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

function LoginCtrl($scope, $location, Auth) {
	if (Auth.loggedIn()) {
		$location.path('/');
	}
	$scope.$on('$firebaseSimpleLogin:login', function() {
		$location.path('/');
	});
	$scope.login = function(username, password) {
		Auth.login(username, password).then(function(user) {
			$scope.errormsg = null;
			$scope.password = null;
			$scope.email = null;
			$location.path('/');
		}, function(evt, err) {
			$scope.errormsg = 'Login fehlgeschlagen!';
			$scope.password = null;
		});
	};
}