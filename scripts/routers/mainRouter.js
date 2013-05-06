define([
	'jquery',
	'backbone'
	'marionette',
], function( $, Backbone, Marionette) {

	var MainRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			"": "renderBoard",
			"img/:imgName": "showImage"
		}
	});

	return MainRouter;
});