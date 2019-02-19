'use strict'

var Router = require('../../src/Routing/Router')

describe('Router', function () {

	var app = {
		routes: [],
		getExpress: () => {
			return { use: (...args) => { app.routes.push(args)} }
		}
	}
	var router = new Router(app)

	describe('point()', function () {
		it('should point path to controller', function () {
			router.point('/')

			router.point('/foo', () => {
			})

			var _r = require('express').Router()
			router.point('/bar', _r)
		})
	})

	describe('loadRoutePointersFrom()', function () {
		it('should map routes from routes file', function () {
			router.loadRoutePointersFrom(require('path').resolve('test/Routing/routes.js'))
		})
	})

	describe('Route Executor', function () {

		it('should execute controller', function () {

			app.routes.forEach((route) => {
				var fakeReq = { url: route[0] }
				var fakeRes = { end: () => { return } }
				var controller = route[1]
				if (Object.getPrototypeOf(controller) !== Object.getPrototypeOf(require('express').Router())) {
					controller(fakeReq, fakeRes)
				}
			})

		})

	})

})
