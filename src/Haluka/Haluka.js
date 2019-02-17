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

	bootstrap () {

		// Builds Express Server
		Helpers.buildExpress(this)

		// Register Global Middlewares
		Helpers.registerGlobalMiddlewares(this)
	}

	/**
	 * Resolves the created Express.js App instance
	 *
	 * @returns {Object}
	 */
	getExpress() {
		return this.resolve('Express') // Resolved by Boxa
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

		var app = this.getExpress()

		// Setup Error-Handler just before listening
		Helpers.setupErrorHandler(app)

		app.listen(port, function() {
			app.emit('Server.Listening', this)
			app.set('http', this)
			if (typeof callback === 'function')
				callback()
		})
	}

	/**
	 *  Closes the active HTTP Server
	 */
	close () {
		var app = this.getExpress()
		if (app.get('http')) {
			app.get('http').close()
			app.set('http', null)
		}else{
			throw new Error('Server not listening.')
		}
	}

}

module.exports = Haluka
