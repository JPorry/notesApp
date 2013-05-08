define([
	'marionette', 'handlebars','text!templates/chooseView.tpl','events/eventAgregator'
], function(Marionette, Handlebars, headerLayout, vent) {

	var ChooseView = Marionette.ItemView.extend({
		template: Handlebars.compile(headerLayout),
		ui:{
			listView: "a.list-view",
			gridView: "a.grid-view"
		},
		active: null,

		events: {
			"click a.list-view": "changeView",
			"click a.grid-view": "changeView"
		},

		initialize: function(){
		//	this.active = this.ui.listView;
		//	this.active.addClass("active");
		},

		onRender: function(){
			this.active = this.ui.listView;
			this.active.addClass("active");
		},

		changeView: function(evt){
			if($(evt.target).is(".active")) return;
			var channel = "";
			if(this.active !== this.ui.listView){
				this.active = this.ui.listView;
				channel = "ChooseView.setListView";
			}else{
				this.active = this.ui.gridView;
				channel = "ChooseView.setGridView"
			}

			this.$el.find(".active").removeClass("active");
			this.active.addClass("active");
			vent.trigger(channel);
			return false;
		}
	});

	return ChooseView;
});