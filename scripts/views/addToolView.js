define([
	'marionette', 'handlebars','text!templates/addTool.tpl','events/eventAgregator'
], function(Marionette, Handlebars, headerView, vent) {

	var AddToolView = Marionette.ItemView.extend({
	  template: Handlebars.compile(headerView),
	  ui: {
	  	inputText: ".inputText",
	  	btnImg: "#insertImg",
	  	btnList: "#insertList"
	  },
	  events : {
	  	'click .inputText': 'loadTextTool',
	  	'click #insertList': 'loadListTool'
	  },

	  loadTextTool: function(evt){
	  	vent.trigger("addTool.loadTextTool");
	  	return false;
	  },

	  loadListTool: function(evt){
	  	vent.trigger("addTool.loadListTool");
	  	return false;
	  }
	});

	return AddToolView;
});