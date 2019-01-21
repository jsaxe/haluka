/**
 * @name RoutingProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var Router = require('./Router')

class RoutingProvider extends ServiceProvider{

	register () {

		this.app.singleton('Router', function (app) {
			return new Router()
		})

	}

}

module.exports = RoutingProvider
