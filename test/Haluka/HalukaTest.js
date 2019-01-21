'use strict'

var expect = require('chai').expect
const request = require('supertest')
var Haluka = require('../../src/Haluka/Haluka')

describe('Haluka', function () {

	// General server
	var server = new Haluka('test/Haluka')
	server.bootstrap()

	describe('middleware()', function () {

		it('should add middleware to express app', function (done) {

			var middleware = (req, res, next) => {
				res.set('X-Test-Case', 'Should-Pass')
				next()
			}

			server.middleware(middleware)

			request(server.getExpress())
				.get('/')
				.expect('X-Test-Case', 'Should-Pass', done)

		})

	})

	describe('listen()', function () {

		before(() => {
			server.getExpress().on('Server.Error', (err, req, res, next) => {
				next()
			})
		})
		after(() => server.close())

		it('should start a HTTP server (with callback)', function (done) {

			server.listen(9999, function () {
				request(server.getExpress())
					.get('/')
					.expect(404)
					.then(res => {
						server.close()
						done()
					})
			})

		})


		it('should start a HTTP server (without callback)', function () {

			server.listen(9999)

		})

	})


	describe('close()', function () {

		it('should throw error when server is not running', function () {

			expect(() => server.close()).to.throw()

		})

	})

	after(function () {
		let store = use('Session/Middleware/StartSession').store
		if (!!store)
			store.stopInterval() // Stopping MemoryStore
	})

})
