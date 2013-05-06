define([
	'jquery', 'marionette', 'handlebars','text!templates/searchingTool.tpl', 'events/eventAgregator'
], function($, Marionette, Handlebars, headerView, vent) {

	var HeaderView = Marionette.ItemView.extend({
	  template: Handlebars.compile(headerView),

	  ui:{
	  	'bSearch': "button",
	  	'iField': "input[type='text']"
	  },
	  events:{
	  	'keyup input[type="text"]': 'doSearch'
	  },

	  doSearch: function(evt){
	  	var criteria = $.trim(this.ui.iField.val());
	  	vent.trigger("searchingTool.doSearch", {criteria: criteria});
	  },
	});

	return HeaderView;
});