define(['jquery','marionette'], function( $, Marionette) {

	var MainController = Marionette.Controller.extend({

		initialize: function(options){
			//do something
		},

		renderBoard: function(){
			console.log("RenderBoard!");
		},

		showImage: function(imgId){
			console.log("ShowImage", this);
		}

	});

	return MainController;
});