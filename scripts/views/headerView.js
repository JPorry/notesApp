define([
	'marionette', 'handlebars','text!templates/header.tpl'
], function(Marionette, Handlebars, headerView) {

	var HeaderView = Marionette.ItemView.extend({
	  template: Handlebars.compile(headerView),
	  tagName: "h1"
	});

	return HeaderView;
});