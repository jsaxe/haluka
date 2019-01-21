'use strict'

var expect = require('chai').expect
const request = require('supertest')
var Haluka = require('../../src/Haluka/Haluka')

describe('Router Integration', function () {

	let app
	before(function () {
		app = new Haluka('test/Haluka')
		app.bootstrap()
	})

	after(function () {
		var session = use('Session/Middleware/StartSession')
		if (session.handled)
			session.store.stopInterval()

		use('Database').closeAll()
	})

	describe('Global `to` method', function () {
		it('should return Controller', function () {
			use('Route')
			expect(to('test')).to.not.equal(null)
		})
	})

	describe('Router', function () {

		describe('loadRoutePointersFrom()', function () {
			it('should map routes from routes file', function () {
				var Route = use('Route')
				Route.loadRoutePointersFrom(app.appPath('routes.js'))

			})
		})

		describe('Route Testing', function () {
			it('should pass Route #1', function (done) {
				// Checking
				request(app.getExpress())
					.get('/foo')
					.then(resp => {
						expect(resp.text).to.equal('Invalid Controller Method provided for this route.')
						done()
					})
			})

			it('should pass Route #2', function (done) {
				// Checking
				request(app.getExpress())
					.get('/bar')
					.then(resp => {
						expect(resp.text).to.equal('Invalid Controller. Router not exported! Tip: Did you forget `module.exports = router`')
						done()
					})
			})

			it('should pass Route #3', function (done) {
				// Checking
				request(app.getExpress())
					.get('/baz')
					.then(resp => {
						expect(resp.text).to.equal('Found!')
						done()
					})
			})
		})

	})

})
