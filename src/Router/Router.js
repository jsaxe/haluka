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
	constructor (controllerPath) {
		Helpers.registerGlobalRoutingHelpers(controllerPath)
	}

	point(path, controller) {
		Helpers.pointRoute(path, controller)
	}

	loadRoutePointersFrom(routeFile) {
		var app = use('Express')
		require(routeFile)
		Helpers.mapRoutes(app)
	}

	routes()  {
		return Helpers.getRoutes()
	}

}

module.exports = Router
