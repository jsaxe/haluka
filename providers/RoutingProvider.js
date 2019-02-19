/**
 * @name RoutingProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../src/Haluka/ServiceProvider')
var Router = require('../src/Routing/Router')
var express = require('express')

class RoutingProvider extends ServiceProvider{

	register () {

		this.app.singleton('Haluka/Routing/Route', function (app) {
			return {
				Route: 	new Router(),
				to: function (controller) {
					return require(require('path').join(app.appPath('Controllers'), controller))
				}
			}
		})

		this.app.register('Haluka/Routing/Router', function (app) {
			return express.Router()
		})

	}

}

module.exports = RoutingProvider
