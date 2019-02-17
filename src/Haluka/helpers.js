'use strict'

// Dependencies
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var busboyBodyParser = require('busboy-body-parser')

var Helpers = module.exports = {}

/**
 * Creates and sets up express app for use.
 */
Helpers.buildExpress = function (app) {
	// Create express
	var express_app = express()

	// Registering JSON & URLEncoded Parsers
	express_app.use(bodyParser.json())
	express_app.use(bodyParser.urlencoded({ extended: true, limit: app.use('Axe/Config').get('express.post.limit', '5mb') }))

	// Multipart Parser (busboy-body-parser)
	express_app.use(busboyBodyParser(app.use('Axe/Config').get('express.uploads')))

	// Trust Proxy
	if (app.use('Axe/Config').get('express.http.trustProxy', false) === true)
		express_app.set('trust proxy', 1)

	// Static Routing Path
	express_app.use(express.static(app.publicPath()))

	// View Engine
	var engine = app.use('Axe/Config').get('express.views.engine')
	var func = (app.use('Axe/Config').get('express.views.' + engine))
	if (typeof func === 'function')
		func(express_app)

	// Registering Express Service
	app.map('Express', express_app)

	return express_app
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
		app.use('Axe/Events').fire('Server.Error.' + err.status, err, req, res, next)
	}.bind(this))
}
