netzwerk.factory("Tasks", function($firebase) {
	var taskUrl = url + '/tasks';
	var taskbase = new Firebase(taskUrl);
	var tasks = $firebase(taskbase);
	var Tasks = {
		getTasks : function() {
			return tasks;
		},
		addTask : function(task) {
			tasks.$add(task);
		}
	};
	return Tasks;
});