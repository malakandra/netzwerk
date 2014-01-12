var url = "https://netzwerk.firebaseio.com/tasks";

angular.module("taskMainView", ["firebase"], function($routeProvider) {
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

function NewTaskCtrl($scope, angularFire) {
    $scope.name = "Neue Aufgabe";
    $scope.taskId = generateId();

    var firebase = new Firebase(url);
    var promise = angularFire(firebase, $scope, "tasks", {});
    promise.then(function() {
        $scope.saveTask = function(name, description, id) {
            saveTask(name, description, id, $scope.tasks);
            $scope.taskId = generateId();
            $scope.taskName = "";
            $scope.taskDescription = "";
        };
    });
}

function DetailTaskCtrl($scope, $routeParams, angularFire) {
    var firebase = new Firebase(url);
    var promise = angularFire(firebase, $scope, "tasks", {});

    promise.then(function() {
        var $task = $scope.tasks[$routeParams.taskId];
        $scope.taskName = $task.name;
        $scope.name = $task.name
        $scope.taskId = $task.id;
        $scope.taskDescription = $task.description;
        $scope.saveTask = function() {
            saveTask($scope.taskName, $scope.taskDescription, $scope.taskId, $scope.tasks);
        };
        $scope.deleteTask = function() {
            deleteTask($routeParams.taskId, $scope.tasks);
        };
    });
}

function TaskMainViewCtrl($scope, angularFire) {
    var firebase = new Firebase(url);
    $scope.taskListName = "Aufgaben"
    var promise = angularFire(firebase, $scope, "tasks", {});
    promise.then(function() {
        $scope.deleteTask = function(id) {
            deleteTask(id, $scope.tasks);
        };
    });
}

function saveTask(name, description, id, tasks) {
    tasks[id] = {
        name: name,
        id: id,
        description: description
    };
}

function deleteTask(id, tasks) {
    delete tasks[id];
}
