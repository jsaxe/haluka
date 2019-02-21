'use strict'

// Dependencies
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var busboyBodyParser = require('busboy-body-parser')
var _ = require('lodash')

var Helpers = module.exports = {}

/**
 * Creates and sets up express app for use.
 */
Helpers.buildExpress = function (expressConfig) {
	// Create express
	var express_app = express()

	// Registering JSON & URLEncoded Parsers
	express_app.use(bodyParser.json())
	express_app.use(bodyParser.urlencoded({ extended: true, limit: _.get(expressConfig, 'post.limit', '5mb') }))

	// Multipart Parser (busboy-body-parser)
	express_app.use(busboyBodyParser(_.get(expressConfig, 'uploads', {})))

	// Trust Proxy
	if (_.get(expressConfig, 'http.trustProxy', false) === true)
		express_app.set('trust proxy', 1)

	// Static Routing Path
	if (_.get(expressConfig, 'static'))
		express_app.use(express.static(_.get(expressConfig, 'static')))

	// Default View Engine
	var defaultEngine =_.get(expressConfig, 'views.default')
	var func = _.get(expressConfig, 'views.' + defaultEngine)
	if (typeof func === 'function')
		func(express_app)

	return express_app
}

/**
 * Sets up Error Handler
 */
Helpers.setupErrorHandler = function (express, events) {
	// For Handling 404
	express.use(function (req, res, next) {
		next(createError(404))
	})

	// Error Reporting
	express.use(function(err, req, res, next) {
		events.fire('Server.Error.' + err.status, err, req, res, next)
		//next()
	}.bind(this))
}


/**
 * Registers Middlewares
 */
Helpers.registerMiddlewares = function (middlewares, app) {
	if (middlewares && middlewares.globalMiddleware && middlewares.namedMiddleware) {
		middlewares.globalMiddleware.forEach(middleware => {
			if (typeof middleware === 'function') {
				app.middleware(middleware) // directly register
			} else {
				var middlewareFn = app.use(middleware) // using resolver from app
				if (typeof middlewareFn === 'function')
					app.middleware(middlewareFn)
				else
					app.middleware(middlewareFn.handle())
			}
		})
	} else {
		throw new Error('Invalid AppData. Middleware Object doesn\'t exist or is invalid')
	}
}
