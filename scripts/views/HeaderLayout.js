define([
	'marionette', 'handlebars','text!templates/HeaderLayout.tpl'
], function(Marionette, Handlebars, headerLayout) {

	var HeaderLayout = Marionette.Layout.extend({
		template: Handlebars.compile(headerLayout),

		regions: {
			header: "#title",
			searchingTool: "#searchingTool"
		}
	});

	return HeaderLayout;
});