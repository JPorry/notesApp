define([
	'jquery', 'underscore', 'backbone', 'models/note','backboneLocalstorage', 'events/eventAgregator'
], function($, _, Backbone, Note, localStorage, vent) {

	var NotesCollection = Backbone.Collection.extend({
		model: Note,
		localStorage: new Backbone.LocalStorage('notes-backbone'),
		
		initialize: function(){

		},
		comparator: function(a){
			return -a.get("creationDate");
		},
		addOne: function(args){
			this.create(args);
		},
		deleteNote: function(args){
			var model = this.findWhere({creationDate: args.model.get("creationDate")});
			if(args.ambit === "task"){
		  		var tasks = model.get("tasks");
		  		tasks.splice(args.sibling-1, 1);
		  		model.save({tasks: tasks});
				return;
			}
			model.destroy();
		},
		search : function(letters){
			if(letters == "") return this.toJSON();
			var pattern = new RegExp(letters,"gi");
			return this.filter(function(data) {
				if(pattern.test(data.get("title"))) return true;
				var i=0,
					tasks = data.get("tasks");
				if(!tasks) return false;
				for(;i<tasks.length;i++){
					if(pattern.test(tasks[i].title)) return true;
				}
			  	return false
			});
		}
	});

	return NotesCollection;
});