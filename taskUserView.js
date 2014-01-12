angular.module("taskUserView", ["firebase"], function($routeProvider) {
    $routeProvider.when(":userId/tasks/offer", {
        templateUrl: "offer.html",
        controller: OfferTaskCtrl
    });
    $routeProvider.when(":userId/tasks/require", {
        templateUrl: "require.html",
        controller: RequireTaskCtrl
    });
});

function TaskUserViewCtrl($scope, angularFireAuth, angularFire) {
    var taskUrl = "https://netzwerk.firebaseio.com/tasks";
    var firebase = new Firebase(taskUrl);
    var promise = angularFire(firebase, $scope, "tasks", {});
}

function OfferTaskCtrl($scope, angularFireAuth, angularFire) {
    function TaskUserViewCtrl($scope, angularFireAuth, angularFire) {
    var taskUrl = "https://netzwerk.firebaseio.com/tasks";
    var firebase = new Firebase(taskUrl);
    var promise = angularFire(firebase, $scope, "tasks", {});
    
    console.log("hallo");
}

}

function RequireTaskCtrl($scope, angularFireAuth, angularFire) {
    
}