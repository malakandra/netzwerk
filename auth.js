netzwerk.factory('Auth', function($firebaseSimpleLogin, $rootScope, $location) {
	var authbase = new Firebase(url);
	var auth = $firebaseSimpleLogin(authbase);

	var Auth = {
		register : function(email, password) {
			return auth.$createUser(email, password);
		},
		loggedIn : function() {
			return auth.user != null;
		},
		isAdmin : function() {
			return auth.user != null && auth.user.email == 'ferdinand.szekeresch@gmail.com';
		},
		logout : function() {
			auth.$logout();
			// after having logged out the user, wait for the user object to
			// update and redirect the user afterwards.
			auth.$getCurrentUser().then(function() {
				$location.path('/login');
			});
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
	$rootScope.isAdmin = function() {
		return Auth.loggedIn() && Auth.isAdmin();
	};

	return Auth;
});