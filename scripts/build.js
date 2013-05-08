({
    baseUrl: ".",
    optimize: "uglify2",
    paths: {
        jquery: 'libs/jquery-1.9.1',
		underscore: 'libs/underscore-min',
		backbone: 'libs/backbone',
		backboneLocalstorage: 'libs/backbone.localStorage-min',
		text: 'libs/require-text',
		marionette: 'libs/backbone.marionette',
		handlebars: 'libs/handlebars',
		jeditable: 'libs/jquery.jeditable.min',
		'jquery.autogrow': 'libs/jquery.autogrow',
		'jeditable.autogrow': 'libs/jquery.jeditable.autogrow',
		'jquery.nicescroll': 'libs/jquery.nicescroll.min'
    },
    shim: {
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		marionette: {
			deps:[
				'jquery', 
				'underscore', 
				'backbone'
			],
			exports: "Marionette"
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'LocalStorage'
		},
		handlebars: {
	      exports: "Handlebars"
	    },
	    jeditable:{
	    	deps: ['jquery'],
	    	exports: "$.editable"
	    },
	    'jquery.autogrow':{
	    	deps:["jquery"],
	    	exports: "$.autogrow"
	    },
	    "jeditable.autogrow":{
	    	deps:["jeditable", 'jquery.autogrow']
	    },
	    'jquery.nicescroll':{
	    	deps: ['jquery']
	    }
	},

    name: "main",
    out: "C:\\xampp\\htdocs\\jp\\scripts\\main-built.js"
})