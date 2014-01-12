var url = "https://netzwerk.firebaseio.com";

angular.module("greeter", ["firebase"], function($routeProvider) {
    $routeProvider.when("/register", {
        templateUrl: "register.html",
        controller: RegisterCtrl
    });
    $routeProvider.otherwise({
        templateUrl: "login.html",
        controller: LoginCtrl
    });
});

function GreeterMainViewCtrl($scope, $rootScope, angularFireAuth, angularFire) {
    var firebase = new Firebase(url);
    angularFireAuth.initialize(firebase, {
        scope: $rootScope,
        name: "user"
    });
    $scope.logout = function() {
        angularFireAuth.logout();
    }
}

function RegisterCtrl($scope, $location, $rootScope, angularFireAuth, angularFire) {
    var firebase = new Firebase(url);
    angularFireAuth.initialize(firebase, {
        scope: $rootScope,
        name: "user"
    });
    $scope.register = function(username, password, confirmpassword) {
        if (password != confirmpassword) {
            $scope.errormsg = "Passwörter stimmen nicht überein!";
        }
        else {
            angularFireAuth.createUser(username, password, function(err, user) {
                if (err) {
                    $scope.errormsg = "Es ist ein Fehler aufgetreten: " + err;
                }
                else if (user) {
                    $location.path("#/login");
                }
            });
        }
    }
}

function LoginCtrl($scope, $location, $rootScope, angularFireAuth, angularFire) {
    var firebase = new Firebase(url);
    angularFireAuth.initialize(firebase, {
        scope: $rootScope,
        name: "user"
    });
    $scope.login = function(username, password) {
        angularFireAuth.login('password', {
            email: username,
            password: password
        });
    };
    $scope.$on("angularFireAuth:error", function(evt, err) {
        $scope.errormsg = "Login fehlgeschlagen!"
        $scope.password = null;
    });
    $scope.$on("angularFireAuth:login", function(evt) {
        $scope.errormsg = null;
        $scope.password = null;
        $scope.email = null;
    });
}