netzwerk.factory("Tasks", function($firebase) {
	var taskUrl = url + '/tasks';
	var taskbase = new Firebase(taskUrl);
	var allTasks = $firebase(taskbase);
	var Tasks = {
		getMyTasks : function () {
//		    var myTasks = $firebase(taskbase.orderByChild('email').equalTo("johannes@gemeinde.de")).$asArray();
		    return allTasks;
		},
		getTasks : function() {
			return allTasks;
		},
		addTask : function(task) {
			allTasks.$add(task);
		}
	};
	return Tasks;
});