'use strict';

var url = 'https://netzwerk.firebaseio.com/templates';

var app = angular.module('taskMainView', [ 'ngRoute', 'firebase' ], function(
		$routeProvider) {
	$routeProvider.when('/templates/new', {
		templateUrl : 'newTemplate.html',
		controller : NewTaskCtrl
	});
	$routeProvider.when('/templates/:taskId', {
		templateUrl : 'detailTemplate.html',
		controller : DetailTaskCtrl
	});
	$routeProvider.otherwise({
		redirectTo : '/templates/new'
	});
});

function NewTaskCtrl($scope, $firebase) {
	$scope.name = 'Neue Aufgabe';
	$scope.taskId = generateId();

	var firebase = new Firebase(url);
	$scope.tasks = $firebase(firebase);
	$scope.saveTask = function(name, description, id) {
		saveTask(name, description, id, $scope.tasks);
		$scope.taskId = generateId();
		$scope.taskName = '';
		$scope.taskDescription = '';
	};
}

function DetailTaskCtrl($scope, $routeParams, $firebase) {
	var firebase = new Firebase(url + "/" + $routeParams.taskId);
	$scope.task = $firebase(firebase);
	$scope.saveTask = function() {
		$scope.task.$save();
	};
	$scope.deleteTask = function() {
		$scope.task.$remove();
	};
}

function TaskMainViewCtrl($scope, $firebase) {
	var firebase = new Firebase(url);
	$scope.taskListName = 'Aufgaben';
	$scope.tasks = $firebase(firebase);
	$scope.deleteTask = function(key) {
		$scope.tasks.$remove(key);
	};
}

function saveTask(name, description, id, tasks) {
	tasks.$add({
		name : name,
		id : id,
		description : description
	});
}
