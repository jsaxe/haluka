'use strict'

var expect = require('chai').expect
var Auth = require('../../src/Auth/Auth')
var request = require('supertest')

describe('Auth', function () {

	let auth
	describe('constructor', function () {

		it('should setup auth', function () {
			auth = new Auth(app)
		})

	})

	describe('AuthenticationMiddleware()', function () {

		it('should return authentication checking express middleware', function (done) {

			var isAuthenticated = auth.AuthenticationMiddleware('/login')
			expect(isAuthenticated).to.be.instanceOf(Function)

			var haluka = require('../integration/index')
			haluka.getExpress().get('/secret', isAuthenticated, (req, res) => {
				res.end('Secret!')
			})
			request(haluka.getExpress())
				.get('/secret')
				.expect(302, function(err, res) {
					expect(res.headers.location).to.equal('/login')
					done()
				})
			
		})

		it('should redirect if logged in', function (done) {

			var isAuthenticated = auth.AuthenticationMiddleware('/login')
			expect(isAuthenticated).to.be.instanceOf(Function)

			var haluka = require('../integration/index')

			var express = haluka.getExpress()

			express.use((req, res, next) => {
				req.user = { name: 'Tester'}
				req.isAuthenticated = () => {
					return true
				}
				next()
			})
			express.get('/secret2', isAuthenticated, (req, res) => {
				res.end('SecretAgain!')
			})
			request(express)
				.get('/secret2')
				.expect('SecretAgain!', done)

		})

	})

})

let app = {
	use: () => {
		return {
			get: () => {
				return {
					default: 'foo',
					guards: {
						foo: {
							strategy: 'bar'
						}
					},
					strategies: {
						bar: () => {}
					}
				}
			}
		}
	},
	getExpress: () => {
		return {
			use: (closure) => {
				closure()
			}
		}
	},
	map: () => {}
}
