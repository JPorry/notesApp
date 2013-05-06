define([
	'jquery','marionette', 'handlebars','text!templates/addTextTool.tpl','events/eventAgregator'
], function($,Marionette, Handlebars, view, vent) {

	var AddTextToolView = Marionette.ItemView.extend({
	  template: Handlebars.compile(view),
	  className: "inputText insertTextTool white",
	  color: "white",
	  ui: {
	  	inputTitle: ".title",
	  	textareaText: ".content",
	  	aSend: "#insert",
	  	aPickColor: "#pickColor",
	  	aInsertImg: "#insertImg",
	  	aInsertList: "#insertList",
	  	aClose: "#close"
	  },
	  events : {
	  	'click #insert': 'insertTextNote',
	  	'keyup .content': 'textarea_height',
	  	'click #close': 'closePanel',
	  	'click #pickColor': 'openColorPicker',
	  	'click #insertList': 'openInsertList',
	  	'click': 'stopPropagation'
	  },

	  initialize: function(){
	  	vent.on("colorPicker.colorChange", $.proxy(this.colorChange, this));
	  },

	  onRender: function(){
	  	var fx = function(){this.ui.textareaText.focus();};
	  	setTimeout($.proxy(fx, this), 200);

	  	$("body, html").on("click", this.closePanel);
	  },

	  nl2br: function(str, is_xhtml) {
	  	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	  },

	  stopPropagation: function(ev){
	  	return false;
	  },

	  openInsertList: function(){
	  	vent.trigger("addTool.loadListTool");
	  	return false;
	  },

	  colorChange: function(obj){
	  	if(obj.target != this.$el) return;
	  	this.$el.removeClass(this.color).addClass(obj.color);
	  	this.color = obj.color;
	  },

	  closePanel: function(){
	  	vent.trigger("addTextTool.close");
	  },

	  openColorPicker: function(){
	  	var top = this.ui.aPickColor.offset().top,
	  		height = this.ui.aPickColor.outerHeight(),
	  		left = this.ui.aPickColor.offset().left,
	  		width = this.ui.aPickColor.outerWidth();
	  	vent.trigger("colorPicker.open", {top:top+height+5, left:left-(width/2), color: this.color, target: this.$el});
	  	return false;
	  },

	  textarea_height: function() {
		var textareaRows = this.ui.textareaText.val().split("\n"),
			counter;
		if(textareaRows[0] != "undefined") counter = textareaRows.length;
		else counter = 1;
		this.ui.textareaText[0].rows = counter; 
	  },

	  insertTextNote: function(evt){
	  	var title = this.ui.inputTitle.val() || "Title",
	  		text = $.trim(this.ui.textareaText.val())!==""? $.trim(this.ui.textareaText.val()): "Content";
	  	vent.trigger("notes.insertNote", {title: title, text: text, date: Date.now(), color: this.color});
	  },

	  onBeforeClose: function(){
	  	$("body, html").off("click", this.closeTool);
	  }
	});

	return AddTextToolView;
});