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
var Boxa = require('boxa');
var Helpers = require('./helpers')
var path = require('path')

class Haluka extends Boxa{


	constructor (basePath, providers = []) {

		// Parent Constructor
		super()

		// Register Paths
		Helpers.registerPaths(basePath, this)

		// Global Helper Methods
		Helpers.registerGlobals(this)

		// Load Service Providers
		Helpers.registerProviders(providers, this)

	}

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

	/* path methids */

	/**
	 * Returns path string relate to base path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	basePath (...args) {
		return path.join(Helpers.basePath, ...args)
	}

	/**
	 * Returns path string relate to public path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	publicPath (...args) {
		return path.join(this.basePath('public'), ...args)
	}

	/**
	 * Returns path string relate to config path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	configPath (...args) {
		return path.join(this.basePath('config'), ...args)
	}

	/**
	 * Returns path string relate to storage path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	storagePath (...args) {
		return path.join(this.basePath('storage'), ...args)
	}

	/**
	 * Returns path string relate to app path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	appPath (...args) {
		return path.join(this.basePath('app'), ...args)
	}

	/**
	 * Returns path string relate to resources path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	resourcesPath (...args) {
		return path.join(this.basePath('resources'), ...args)
	}

}

module.exports = Haluka
