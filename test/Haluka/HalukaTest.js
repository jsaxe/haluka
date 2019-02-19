'use strict'

var expect = require('chai').expect
const request = require('supertest')
var Helper = require('../../src/Haluka/helpers')

describe('Haluka', function () {

	// General server
	let haluka = require('../integration/index')


	describe('getExpress()', function () {

		it('should return express instance', function () {

			expect(Object.getPrototypeOf(haluka.getExpress())).to.equal(Object.getPrototypeOf(require('express')))

		})

	})

	describe('middleware()', function () {

		before(() => {
			haluka.map('Haluka/Test/Middleware', {
				handle: () => { return (req, res, next) => {
					res.set('X-Mapped-Test-Case', 'Should-Pass')
					next()
				}}
			})
			haluka.bootstrapServer(middlewaresAppData)
		})

		it('should add middleware to express app', function (done) {

			var middleware = (req, res, next) => {
				res.set('X-Test-Case', 'Should-Pass')
				next()
			}

			haluka.middleware(middleware)

			request(haluka.getExpress())
				.get('/')
				.expect('X-Test-Case', 'Should-Pass', done)

		})

	})

	describe('listen()', function () {

		before(() => {
			haluka.use('Axe/Events').on('Server.Error', (err, req, res, next) => {
				next()
			})
		})

		it('should start HTTP server', function (done) {

			haluka.listen(9988, () => {
				request(haluka.getExpress())
					.get('/foo')
					.expect(404)
					.then(res => {
						haluka.close()
						done()
					})
			})

		})

		it('should start a HTTP server (without callback)', function () {

			haluka.listen(9999)

		})

		after(() => {
			haluka.close()
		})

	})

	describe('close()', function () {

		it('should throw error when server is not listening', function () {

			expect(() => {
				haluka.close()
			}).to.throw('Server not listening.')

		})

	})

	describe('Helper', function () {

		describe('buildExpress', function () {

			it('should return built express instance', function () {

				// without config
				Helper.buildExpress()

				// with config
				Helper.buildExpress({
					http: {
						trustProxy: true,
					},
					static: app().publicPath(),
					views: {
						default: 'myviewengine',
						myviewengine: () => {},
					}
				})

			})

		})

		describe('registerMiddlewares', function () {

			it('should throw error on invalid middleware data', function () {

				expect(() => {
					Helper.registerMiddlewares()
				}).to.throw('Invalid AppData. Middleware Object doesn\'t exist or is invalid')

			})

		})

	})

})


// Middleware Test


let middlewaresAppData = {

	namedMiddleware: [
		//
	],

	globalMiddleware: [
		// function
		(req, res, next) => {
			res.set('X-App-Test-Case', 'Should-Pass')
			next()
		},
		'Haluka/Test/Middleware'
	]

}
