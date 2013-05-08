define([
	'marionette', 'handlebars','jeditable', 'jeditable.autogrow', 'libs/utils', 'text!templates/noteGrid.tpl', 'events/eventAgregator'
], function(Marionette, Handlebars, editable, autogrow, Utils, noteView, vent) {

	var NoteItemGridView = Marionette.ItemView.extend({
	  template: Handlebars.compile(noteView),
	  tagName : "article",
	  className : "noteGrid",

	  events:{

	  },

	  initialize: function(){
	  	this.listenTo(this.model, "change", this.render);
	  },

	  onRender: function(){
	  	this.$el.attr("class", this.className);
	  	this.$el.addClass(this.model.get("color"));
	  }

	});

	return NoteItemGridView;
});