var url = "https://netzwerk.firebaseio.com/tasks";

angular.module("taskMainView", ["ngRoute", "firebase"], function($routeProvider) {
    $routeProvider.when("/tasks/new", {
        templateUrl: "newTask.html",
        controller: NewTaskCtrl
    });
    $routeProvider.when("/tasks/:taskId", {
        templateUrl: "detailTask.html",
        controller: DetailTaskCtrl
    });
    $routeProvider.otherwise({
        redirectTo: "/tasks/new"
    });
});

function NewTaskCtrl($scope, $firebase) {
    $scope.name = "Neue Aufgabe";
    $scope.taskId = generateId();

    var firebase = new Firebase(url);
    $scope.tasks = $firebase(firebase);
    $scope.saveTask = function(name, description, id) {
        saveTask(name, description, id, $scope.tasks);
        $scope.taskId = generateId();
        $scope.taskName = "";
        $scope.taskDescription = "";
    };
}

function DetailTaskCtrl($scope, $routeParams, $firebase) {
    var firebase = new Firebase(url + $routeParams.taskId);
    $scope.task = $firebase(firebase);

    $scope.taskName = $task.name;
    $scope.name = $task.name
    $scope.taskId = $task.id;
    $scope.taskDescription = $task.description;
    $scope.saveTask = function() {
        saveTask($scope.taskName, $scope.taskDescription, $scope.taskId, $scope.tasks);
    };
    $scope.deleteTask = $task.$remove();

function TaskMainViewCtrl($scope, $firebase) {
    var firebase = new Firebase(url);
    $scope.taskListName = "Aufgaben"
    $scope.tasks = $firebase(firebase);
    $scope.deleteTask = function(key) {
        deleteTask(key, $scope.tasks);
    };
}

function saveTask(name, description, id, tasks) {
    tasks.$add({
        name: name,
        id: id,
        description: description
    });
}

function deleteTask(key, tasks) {
    tasks.$remove(key);
}
