define([
	'jquery','marionette', 'handlebars','text!templates/addListTool.tpl','events/eventAgregator'
], function($,Marionette, Handlebars, view, vent) {

	var AddListToolView = Marionette.ItemView.extend({
	  template: Handlebars.compile(view),
	  className: "inputText insertListTool white",
	  color: "white",
	  ui: {
	  	inputTitle: ".title",
	  	taskList: ".tasklist .task", //ARRAY
	  	aSend: "#insert",
	  	aPickColor: "#pickColor",
	  	aClose: "#close"
	  },
	  events : {
	  	'click #close': 'closeTool',
	  	'click #pickColor': 'openColorPicker',
	  	'keyup .task .taskname': "insertNewTaskField",
	  	'click #insert': 'insertListNote',
	  	'click': 'stopPropagation'
	  },

	  initialize: function(){
	  	vent.on("colorPicker.colorChange", $.proxy(this.colorChange, this));
	  },

	  onRender: function(){
	  	var fx = function(){this.ui.taskList.eq(0).find(".taskname").focus();};
	  	setTimeout($.proxy(fx, this), 200);

	  	$("body, html").on("click", this.closeTool);
	  },

	  insertNewTaskField: function(ev){
	  	var target = $(ev.target);
  		if(target.parent().is(":last-child")){
  			var newTask = target.parent().clone();
  			newTask.find(".taskname").val('');
  			$(".tasklist").append(newTask);
  		}
	  },

	  openColorPicker: function(){
	  	var top = this.ui.aPickColor.offset().top,
	  		height = this.ui.aPickColor.outerHeight(),
	  		left = this.ui.aPickColor.offset().left,
	  		width = this.ui.aPickColor.outerWidth();
	  	vent.trigger("colorPicker.open", {top:top+height+5, left:left-(width/2), color: this.color, target:this.$el});
	  	return false;
	  },

	  colorChange: function(obj){
	  	if(obj.target != this.$el) return;
	  	this.$el.removeClass(this.color).addClass(obj.color);
	  	this.color = obj.color;
	  },

	  closeTool: function(){
	  	vent.trigger("addListTool.close");
	  },

	  stopPropagation: function(ev){
	  	return false;
	  },

	  insertListNote: function(evt){
	  	var title = this.ui.inputTitle.val() || "Title",
	  		tasks = [];
	  	this.$el.find(".taskname").each(function(index, obj){
	  		if($.trim($(obj).val())==="") return;
	  		tasks.push({title: $(obj).val(), done: false})
	  	});
	  	vent.trigger("notes.insertNote", {title: title, tasks: tasks, date: Date.now(), color: this.color});
	  },

	  onBeforeClose: function(){
	  	$("body, html").off("click", this.closeTool,this);
	  }
	});

	return AddListToolView;
});