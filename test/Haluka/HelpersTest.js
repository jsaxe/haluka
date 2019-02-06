'use strict'

var _ = require('lodash')
var Haluka = require('../../src/Haluka/Haluka')
var Helpers = require('../../src/Haluka/helpers')

describe('Helpers', function () {

	let app
	before(function () {
		app = new Haluka('test/Haluka')
		app.bootstrap()
	})

	after(function () {
		var session = app.use('Session/Middleware/StartSession')
		if (session.handled)
			session.store.stopInterval()

		use('Database').closeAll()
	})

	describe('Database:booting provider', function () {
		it('should boot database service', function (done) {
			use('Database').setup().then(() => {done()})
		})
	})

	describe('Auth:booting provider', function () {
		it('should boot auth service', function () {
			app.register('Haluka/Model/User', function () {
				return require('./app/Model/User')
			})
			use('Auth')
		})
	})

	describe('Package:booting provider', function () {
		it('should boot package service', function () {
			use('PackageLoader')
		})
	})

	// Should be at last
	describe('Haluka:buildExpress()', function () {
		it('should build express app', function () {
			// Fake unconfigured config
			app.map('Config', {

				app: {

				},

				get: (key, def) => {
					return _.get(this, key)
				}
			})
			app.storagePath()
			app.appPath()
			Helpers.buildExpress(app)
		})
	})

})


