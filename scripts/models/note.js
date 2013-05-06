define([
	'backbone', 'backboneLocalstorage'
], function(Backbone, localStorage) {
	'use strict';

	var Note = Backbone.Model.extend({
		defaults:{
			creationDate: 0,
			title: "Title",
			text: undefined,
			color: "white",
			tasks: null,
		},
		localStorage: new Backbone.LocalStorage('notes-backbone'),
		initialize : function() {
	      if (this.isNew()) this.set('creationDate', Date.now());
	    },
	});

	return Note;
});