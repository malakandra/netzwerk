'use strict';
var url = 'https://netzwerk.firebaseio.com';
var netzwerk = angular.module('netzwerk', [ 'ngRoute', 'firebase' ],
		function($routeProvider) {
			$routeProvider.when('/register', {
				templateUrl : 'register.html',
				controller : RegisterCtrl,
				unAuthAllowed : true
			});
			$routeProvider.when('/login', {
				templateUrl : 'login.html',
				controller : LoginCtrl,
				unAuthAllowed : true
			});
			$routeProvider.when('/newTask', {
				templateUrl : 'newTask.html',
				controller : NewTaskCtrl
			});
			$routeProvider.otherwise({
				templateUrl : 'newTask.html',
				controller : NewTaskCtrl
			});
		}).run(function($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if (!next.unAuthAllowed) {
			if (!Auth.loggedIn()) {
				$location.path('/login');
			}
		}
	});
});

function GreeterMainViewCtrl($scope, $location, $firebase, Auth, Tasks) {
	$scope.logout = function() {
		Auth.logout();
	};
	$scope.getUser = function() {
		return Auth.getUser();
	};
	$scope.tasks = Tasks.getMyTasks();
	$scope.getVerb = function(isOffer) {
		if (isOffer) {
			return "bietet";
		} else {
			return "sucht";
		}
	};
}

function NewTaskCtrl($scope, $rootScope, $firebase, Tasks, Auth, Templates) {
	var templates = Templates.getTemplates();
	templates.$on("loaded", function() {
		$scope.templates = templates;
	});
	$scope.saveTask = function() {
		Tasks.addTask({
			name : $scope.template.name,
			description : $scope.taskDescription,
			isOffer : $scope.isOffer,
			email : Auth.getUser().email
		});
	};
	$scope.isOffer = true;
	$scope.setOffer = function(isOffer) {
		$scope.isOffer = isOffer;
	};
}

function RegisterCtrl($scope, $location, $firebase, Auth) {
	if (Auth.loggedIn()) {
		$location.path('/');
	}
	$scope.$on('$firebaseSimpleLogin:login', function() {
		$location.path('/');
	});
	$scope.register = function(username, password, confirmpassword) {
		if (password != confirmpassword) {
			$scope.errormsg = 'Passwörter stimmen nicht überein!';
		} else {
			Auth.register(username, password, false).then(function(user) {
			}, function(evt, err) {
				$scope.errormsg = "Registrieren fehlgeschlagen!";
			});
		}
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