define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'jquery.nicescroll',
	'libs/utils',

	'views/HeaderLayout',
	'views/headerView',
	'views/SearchingToolView',
	'views/AddToolView',
	'views/noteCollectionView',
	'collections/notesCollection',
	'views/addTextToolView',
	'views/addListToolView',
	'views/colorPickerView',

	'events/eventAgregator'
], function( $, _, Backbone, Marionette, NiceScroll, Utils, HeaderLayout, HeaderView, SearchingToolView, AddToolView, NoteCollectionView, NotesCollection, AddTextToolView, AddListToolView, ColorPickerView, vent) {

	var MyApp = new Marionette.Application(),
		notes = new NotesCollection()
	
	MyApp.addRegions({
		header: "#header",
		addTool: ".addTool",
		notes: ".notes",
		modals: "#modals"
	});

	var headerLayout = new HeaderLayout();
	MyApp.header.show(headerLayout);
		headerLayout.header.show(new HeaderView());
		headerLayout.searchingTool.show(new SearchingToolView());

	MyApp.addTool.show(new AddToolView());

	MyApp.notes.show(new NoteCollectionView({collection: notes}));

	vent.on('addTool.loadTextTool', function (e) { MyApp.addTool.show(new AddTextToolView());});
	vent.on('addTool.loadListTool', function (e) { MyApp.addTool.show(new AddListToolView());});

	vent.on('notes.insertNote', function (e) { MyApp.addTool.show(new AddToolView()) });
	vent.on('addTextTool.close', function (e) { MyApp.addTool.show(new AddToolView()) });
	vent.on('addListTool.close', function (e) { MyApp.addTool.show(new AddToolView()) });

	vent.on('colorPicker.open', function(obj){
		MyApp.modals.show(new ColorPickerView({target:obj}));
	});

	vent.on('colorPicker.close', function(obj){
		MyApp.modals.close();
	});
	vent.on('notes.delete', function(obj){
		MyApp.modals.close();
	});

	vent.on("searchingTool.doSearch", function (e) {
		notes.add(MyApp.notes.currentView.collection.toJSON());
		var collectionFiltered = new NotesCollection(notes.search(e.criteria));
		MyApp.notes.show(new NoteCollectionView({collection: collectionFiltered}));
		$("#main").getNiceScroll().resize();
		
	});

	var height = $(window).height()-$("header").outerHeight();
	$("#main").css("height", height);
	$("#main").niceScroll({autohidemode: false, cursorborderradius: 0, cursorwidth: 10, cursorcolor: "#ccc", cursorborder:"1px solid #bbb", railoffset: {left: -2}});
	$("#main").on("scroll", function(){MyApp.modals.close();});
	$(window).on("resize", function(){
		var height = $(window).height()-$("header").outerHeight();
		$("#main").css("height", height);
		$("#main").getNiceScroll().resize()
	});

	/*--data formats--*/

	Handlebars.registerHelper('nl2br', $.proxy(function(text) {
	  return this.nl2br(text);
	}, Utils));

	Handlebars.registerHelper('dateformat', function(time) {
	  var d = new Date(time);
	  return (d.getDate()>9 ? "":"0")+d.getDate()+"/"+(d.getMonth()+1>9 ? "":"0")+(d.getMonth()+1)+"/"+d.getFullYear();
	});

	/*----------------*/

	notes.fetch();

	return MyApp;
});