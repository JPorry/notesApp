define([
	'jquery','marionette', 'handlebars','text!templates/colorPicker.tpl','events/eventAgregator'
], function($, Marionette, Handlebars, template, vent) {

	var HeaderView = Marionette.ItemView.extend({
	  template: Handlebars.compile(template),
	  className: "tooltip colorpicker",

	  events:{
	  	'click li': 'pickColor',
	  	'mouseleave': 'closePanel'	  
	  },

	  color: "white",
	  target: null,

	  initialize: function(){
	  	if(this.options.target){
	  		this.$el.css("top", this.options.target.top);
	  		this.$el.css("left", this.options.target.left);
	  		if(this.options.target.color){
	  			this.color = this.options.target.color;
	  		}
	  		this.target = this.options.target.target;
	  		
	  	}
	  },

	  onRender: function(){
		this.$el.find(".active").removeClass("active");
		this.$el.find("."+this.color).addClass("active");
		$("body, html").on("click", this.closePanel);
	  },

	  pickColor: function(evt){
	  	this.$el.find(".active").removeClass("active");
	  	var color = $(evt.target).attr("class");
	  	$(evt.target).addClass("active");
	  	vent.trigger("colorPicker.colorChange", {color: color, target: this.target});
	  	return false;
	  },

	  closePanel: function(){
	  	vent.trigger("colorPicker.close");
		return false;
	  },

	  onBeforeClose: function(){
	  	$("body, html").off("click", this.closePanel);
	  }

	});

	return HeaderView;
});