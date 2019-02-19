/**
 * @name Router
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var Helpers = require('./helpers')

/**
 * Router Class
 *
 * @class
 */
class Router {

	/**
	 * Constructor
	 */
	constructor (app) {
		this.app = app
	}

	point(path, controller) {
		Helpers.pointRoute(path, controller)
	}

	loadRoutePointersFrom(routeFile) {
		require(routeFile)
		Helpers.mapRoutes(this.app.getExpress())
	}
}

module.exports = Router
