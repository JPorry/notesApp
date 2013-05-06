define([
	'jquery','marionette', 'handlebars','text!templates/deleteListItem.tpl','events/eventAgregator'
], function($, Marionette, Handlebars, template, vent) {

	var DeleteItem = Marionette.ItemView.extend({
	  template: Handlebars.compile(template),
	  className: "tooltip deleteItem",

	  over: false,
	  target: null,
	  targetModel: null,
	  timer: null,
	  ambit: "note",
	  sibling: null,

	  events:{
	  	"mouseenter":"onMouseEnter",
	  	"mouseleave": "onMouseLeave",
	  	"click a#aDeleteItem": "deleteItem",
	  	"click": "stopPropagation"
	  },

	  initialize: function(){
	  	if(this.options.target){
	  		this.$el.css("top", this.options.target.top);
	  		this.$el.css("left", this.options.target.left);
	  		this.target = this.options.target.target;
	  		this.targetModel = this.options.target.model;
	  		this.ambit = this.options.ambit? this.options.ambit : this.ambit;
	  		this.sibling = this.options.target.sibling;
	  	}
	  },

	  onBeforeRender: function(){
	  	this.$el.css("opacity", 0);
	  },

	  onRender: function(){
	  	this.$el.css("opacity", 1);
	  	vent.on('noteListItem.out', $.proxy(this.closePanel, this));
	  },

	  stopPropagation: function(){
	  	return false;
	  },

	  closePanel: function(evt){
	  	var fx = function(){
	  		if(!this.over) vent.trigger("deleteListItem.close")
	  	};
	  	this.timer = setTimeout($.proxy(fx, this), 200);
	  	return false;
	  },

	  deleteItem: function(evt){
	  	evt.preventDefault();
	  	if(this.target && this.targetModel){
	  		this.target.css("opacity", 0);
	  		this.target.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", $.proxy(function(){
	  			this.target.remove();
	  			vent.trigger("notes.delete", {model:this.targetModel, ambit: this.ambit, sibling: this.sibling});
	  		}, this));
	  	}
	  },

	  onMouseEnter: function(){
	  	this.over = true;
	  	return false;
	  },

	  onMouseLeave: function(){
	  	this.over = false;
	  	this.closePanel();
	  	return false;
	  },

	  onBeforeClose: function(){
	  	clearTimeout(this.timer);
	  	this.timer = null;
	  	vent.off('noteListItem.out');
	  }

	});

	return DeleteItem;
});