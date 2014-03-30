netzwerk.factory("Templates", function($firebase) {
	var templateUrl = url + '/templates';
	var templatebase = new Firebase(templateUrl);
	var templates = $firebase(templatebase);
	var Templates = {
		getTemplates : function() {
			return templates;
		}
	};
	return Templates;
});