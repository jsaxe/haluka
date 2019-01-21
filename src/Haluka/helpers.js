'use strict'

// Dependencies
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var busboyBodyParser = require('busboy-body-parser')
var _ = require('lodash')
var path = require('path')

var Helpers = module.exports = {}

/**
 * Registers path variables
 */
Helpers.registerPaths = function (basePath, app) {
	Helpers.basePath = path.resolve(_.trimEnd(basePath, '\/'))
}

/**
 * Creates global use, map and error functions.
 */
Helpers.registerGlobals = function (scope) {
	global.use = scope.use.bind(scope);
	global.map = scope.map.bind(scope);
	global.error = createError;

	// Haluka Global Instance
	global.app = function (name) {
		return !!name ? scope.use(name) : scope
	}
}

Helpers.registerProviders = function (providers, container) {

	[
		require('../Env/EnvProvider'), 				// Env
		require('../Config/ConfigProvider'), 		// Config
		require('../Session/SessionProvider'),		// Session
		require('../Database/DatabaseProvider'),	// Database
		require('../Auth/AuthProvider'),			// Auth
		require('../Router/RouterProvider'),		// Router
	]
		.concat(providers)
		.forEach(provider => {
			var obj = new provider(container)
			obj.register()
		})

}

/**
 * Creates and sets up express app for use.
 */
Helpers.buildExpress = function (app) {
	// Create express
	var express_app = express()

	// Registering JSON & URLEncoded Parsers
	express_app.use(bodyParser.json())
	express_app.use(bodyParser.urlencoded({ extended: true, limit: app.use('Config').get('express.post.limit', '5mb') }))  // TODO

	// Multipart Parser (busboy-body-parser)
	express_app.use(busboyBodyParser(app.use('Config').get('express.uploads')))

	// Trust Proxy
	if (app.use('Config').get('express.http.trustProxy', false) === true)
		express_app.set('trust proxy', 1)

	// Static Routing Path
	express_app.use(express.static(app.publicPath()))

	// View Engine
	var engine = app.use('Config').get('express.views.engine')
	var func = (app.use('Config').get('express.views.' + engine))
	if (typeof func === 'function')
		func(express_app)

	// Registering Express Service
	app.map('Express', express_app)

	return express_app
}

Helpers.registerGlobalMiddlewares = function (app) {
	// Global Middlewares
	[
		'Session/Middleware/StartSession'
	]
		.forEach(middleware => {
			app.getExpress().use(app.use(middleware).handle()) // using resolver from app
		})
}

/**
 * Sets up Error Handler
 */
Helpers.setupErrorHandler = function (app) {
	// For Handling 404
	app.use(function (req, res, next) {
		next(createError(404))
	})

	// Error Reporting
	app.use(function(err, req, res, next) {
		err.status = err.status
		app.emit('Server.Error', err, req, res, next)
	}.bind(this))
}
