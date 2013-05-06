define([], function(Marionette, Handlebars, autogrow, noteView, vent) {
	
	var Utils = {};

	Utils.br2nl = function(varTest){
		return varTest.replace(/<br>/g, "\r");
	};

	Utils.nl2br = function(str, is_xhtml) {
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	};

	return Utils;
});