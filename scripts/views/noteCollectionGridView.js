define([
	'marionette', 'handlebars','views/noteItemGridView', 'events/eventAgregator'
], function(Marionette, Handlebars, myItemView, vent) {

	var NoteCollectionView = Marionette.CollectionView.extend({
	  itemView: myItemView,
	  self: this,
	  className: "notesGrid",
	  initialize: function(){
	  	this.listenTo(this.collection, "sort", this.render);
	  	this.listenTo(this.collection, "remove", this.render);

		vent.on("notes.insertNote", this.addOne, this);
		vent.on("notes.delete", this.deleteNote, this);
	  },

	  addOne: function(args){
	  	this.collection.addOne(args);
	  },

	  deleteNote: function(args){
	  	this.collection.deletNote(args);
	  },

	  onBeforeClose: function(){
	  	vent.off("notes.insertNote", this.addOne, this);
		vent.off("notes.delete", this.deleteNote, this);
	  }
	});

	return NoteCollectionView;
});