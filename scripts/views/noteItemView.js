define([
	'marionette', 'handlebars','jeditable', 'jeditable.autogrow', 'libs/utils', 'text!templates/note.tpl', 'events/eventAgregator'
], function(Marionette, Handlebars, editable, autogrow, Utils, noteView, vent) {

	var NoteItemView = Marionette.ItemView.extend({
	  template: Handlebars.compile(noteView),
	  tagName : "article",
	  className : "note text",

	  timer: null,

	  events:{
	  	'click input[type="checkbox"]': 'toggleCompleted',
	  	'click a.delete.note': 'deleteNote',
	  	'click li a.delete.task': 'deleteTask',
	  	'keyup li': 'insertTask',
	  	'click a.pickColor': 'openColorPicker'
	  },

	  initialize: function(){
	  	this.listenTo(this.model, "change", this.render);

	  	vent.on("colorPicker.colorChange", this.colorChange, this);
	  },

	  setCursorEnd: function(input){
		input.focus(); //sets focus to element
		var val = this.input.value; //store the value of the element
		this.input.value = ''; //clear the value of the element
		this.input.value = val; //set that value back.  
	  },

	  onRender: function(){
	  	this.$el.attr("class", this.className);
	  	this.$el.addClass(this.model.get("color"));

	  	this.$el.find('h1.note-title').editable($.proxy(this.updateTitle, this), {
	  		data: function(value, settings){
	  			setTimeout($.proxy(function(){
	  				var input = $(this).find("input").get(0);
					var val = input.value; //store the value of the element
					input.value = ''; //clear the value of the element
					input.value = val; //set that value back.  
	  			}, this), 2);
	  			return value;
	  		},
		    type    : 'text',
		    onblur : 'submit'
		});
	  	this.$el.find('p.text').editable($.proxy(this.updateText, this), { 
	  		data: function(value, settings){
	  			setTimeout($.proxy(function(){
	  				var input = $(this).find("textarea").get(0);
					var val = input.value; //store the value of the element
					input.value = ''; //clear the value of the element
					input.value = val; //set that value back.  
	  			}, this), 2);
	  			return settings.model.get("text");
	  		},
		    type    : 'autogrow',
		    onblur : 'submit',
		    model: this.model
		 });
	  	this.$el.find('li p.task-text').editable(this.updateTask, {
	  		data: function(value, settings){
	  			setTimeout($.proxy(function(){
	  				var input = $(this).find("textarea").get(0);
					var val = input.value; //store the value of the element
					input.value = ''; //clear the value of the element
					input.value = val; //set that value back.  
	  			}, this), 2);
	  			return Utils.br2nl(value);
	  		},
		    type    : 'autogrow',
		    onblur : 'submit',
		    width: 550,
		    model: this.model
		 });

	  	/*var newval = this.nl2br($(this.$el.find('p.text').get(0)).html());
	  	$(this.$el.find('p.text').get(0)).html(newval)*/
	  },

	  insertTask: function(evt){
	  	var target = $(evt.target);
	  	if(!target.is("li")) target = target.closest("li");
  		if(target.is(":last-child")){
  			var newTask = target.clone();
  			newTask.find(".task-text").get(0).innerHTML = "Insert task...";
  			$(newTask.find("input[type='checkbox']").get(0)).prop("checked", false);
  			$(this.$el.find("ul").get(0)).append(newTask);
  			$(newTask.find("p.task-text").get(0)).editable(this.updateTask, {
		  		data: function(value, settings){
		  			setTimeout($.proxy(function(){
		  				var input = $(this).find("textarea").get(0);
						var val = input.value; //store the value of the element
						input.value = ''; //clear the value of the element
						input.value = val; //set that value back.  
		  			}, this), 2);
		  			return Utils.br2nl(value);
		  		},
			    type    : 'autogrow',
			    onblur : 'submit',
			    width: 550,
			    model: this.model
			 });
  		}
	  },

	  openColorPicker: function(evt){
	  	var top = $(evt.target).offset().top,
	  		height = $(evt.target).outerHeight(),
	  		left = $(evt.target).offset().left,
	  		width = $(evt.target).outerWidth();
	  	vent.trigger("colorPicker.open", {top:top, left:left-20, color: this.model.get("color"), target: this.$el});
	  	return false;
	  },

	  colorChange: function(obj){
	  	if(obj.target == this.$el) this.model.save({color: obj.color});
	  },

	  updateTitle: function(value, settings){
	  	this.model.save({title: value});
	  	this.model.trigger("change");
	  	return(value);
	  },

	  updateText: function(value, settings){
	  	this.model.save({text: Utils.br2nl(value)});
	  	this.model.trigger("change");
	  	return(Utils.nl2br(value));
	  },

	  toggleCompleted: function(evt){
	  	var index = $(evt.target).closest("li").index();
	  	var tasks = this.model.get("tasks");
	  	tasks[index].done = !tasks[index].done;
	  	this.model.save({tasks: tasks});
	  	this.model.trigger("change");
	  	return false;
	  },

	  updateTask: function(value, settings){
		var index = $(this).closest("li").index();
	  	var tasks = settings.model.get("tasks");
	  	if(index >= tasks.length){
	  		tasks.push({title:Utils.br2nl(value), done: false});
	  	}else{
	  		tasks[index].title = Utils.br2nl(value);
	  	}
	  	settings.model.save({tasks: tasks});
	  	return Utils.nl2br(value);
	  },

	  deleteNote: function(evt){
	  	evt.preventDefault();
	  	var fx = function(){this.model.destroy();};
	  	this.$el.css("opacity", 0);
	  	this.$el.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", $.proxy(fx, this));
	  	return false;
	  },

	  deleteTask: function(evt){
	  	evt.preventDefault();
	  	var tgt = $(evt.target).closest("li");
	  	var index = tgt.index();
	  	var tasks = this.model.get("tasks");
	  	tasks.splice(index, 1);
	  	var fx = function(){
	  		this.model.save({tasks: tasks});
	  		this.model.trigger("change");
	  	};
	  	tgt.css("opacity", 0);
	  	tgt.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", $.proxy(fx, this));
	  	return false;
	  },

	  onBeforeClose: function(){
	  	clearInterval(this.timer);
	  	vent.off("colorPicker.colorChange", this.colorChange, this);
	  }
	});

	return NoteItemView;
});