'use strict'

/**
 *
 * @name Haluka
 * @author Robin Panta <hacktivistic@gmail.com>
 *
 */

/**
 * Dependencies
 */
var Blade = require('axe-blade').Application
var Helpers = require('./helpers')

class Haluka extends Blade {

	bootstrapServer (middlewares) {

		// Builds Express Server
		this.express = Helpers.buildExpress(this.use('Axe/Config').get('express'))
		this.use('Axe/Events').fire('Express.Bootstrapped', this.express)

		// Register Global Middlewares
		Helpers.registerMiddlewares(middlewares, this)
		this.use('Axe/Events').fire('Express.MiddlewaresRegistered', this.express)
		this.middlewares = middlewares.namedMiddleware

	}

	/**
	 * Resolves the created Express.js App instance
	 *
	 * @returns {Object}
	 */
	getExpress() {
		return this.express
	}


	/**
	 * Registers Express Middleware
	 * @param {Function} middleware
	 */
	middleware (middleware) {
		this.getExpress().use(middleware)
	}


	/**
	 * Fires up the HTTP Server
	 *
	 * @param {Number} port
	 * @param {closure} callback
	 */
	listen (port, callback) {

		var express = this.getExpress()
		var events = this.use('Axe/Events')

		// Setup Error-Handler just before listening
		Helpers.setupErrorHandler(express, events)

		express.listen(port, function() {
			events.fire('Server.Listening', this)
			express.set('http', this)
			if (typeof callback === 'function')
				callback()
		})
	}

	/**
	 *  Closes the active HTTP Server
	 */
	close () {
		var express = this.getExpress()
		var events = this.use('Axe/Events')
		if (express.get('http')) {
			express.get('http').close()
			express.set('http', null)
			events.fire('Server.Closed', this)
		}else{
			throw new Error('Server not listening.')
		}
	}

}

module.exports = Haluka
