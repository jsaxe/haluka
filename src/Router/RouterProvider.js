/**
 * @name RoutingProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var Router = require('./Router')
var express = require('express')

class RoutingProvider extends ServiceProvider{

	register () {

		this.app.singleton('Route', function (app) {
			return new Router(app.appPath('Controllers'))
		})

		this.app.register('Router', function (app) {
			return express.Router()
		})

	}

}

module.exports = RoutingProvider
