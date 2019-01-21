'use strict'

var expect = require('chai').expect;
var _ = require('lodash');
var debug = require('debug')('test')

// Dependencies
var Application = require('../../src/Haluka/Haluka')
var request = require('supertest')

var StoreKeeper = require('../../src/Session/StoreKeeper')
var SessionProvider = require('../../src/Session/SessionProvider')

describe('Session Provider', function () {

	var app = new Application('./test/Session')

	before(function () {

		// Registering Config provider for test
		app.singleton('Config', function (app) {
			return {
				data: {

					session: {
						store: 'memory',
						unset: 'destroy',
						saveUninitialized: false,
						stores: {

							memory: {

								checkPeriod: 86400000

							},

							file: {

								path: '',
								reapAsync: true,
								reapSyncFallback: true

							}

						}
					},


				},

				get: function (key) {
					return _.get(this.data, key)
				}
			}
		})

	})

	var provider = new SessionProvider(app)

	describe('_prepareConfig()', function () {


		it('should start and initiate session', function () {

			var fakeConfig = {
				cookie : {
					jar: 'bottle',
					element: 'glass'
				},
				flavour: 'strawberry',
			}

			var fakePreparedConfig = {
				cookie : {
					jar: 'bottle',
					element: 'glass'
				},
				flavour: 'strawberry',
				name: 'Haluka Test',
				secret: 'tuccha-tuccha',
			}

			expect(provider._prepareConfig(fakeConfig)).to.deep.equal(fakePreparedConfig)

		})

	})

	describe('register()', function () {

		it('should register the provider', function () {

			provider.register()

		})

		it ('should be able to resolve StartSession Middleware', function () {

			debug('starting express server')
			var server = require('express')()
			debug('started express server')
			server.use(app.use('Session/Middleware/StartSession').handle())
			debug('session middleware registered')
			this.server = server

		})

		describe('Checking Provider Behaviour', function () {

			before(function () {
				this.server.get('/', (req, res) => {
					expect(req.session).to.be.instanceOf(Object)
					req.session.test_data = "TestingData"
					res.end('session set')
				})

				this.server.get('/return', (req, res) => {
					expect(req.session).to.be.instanceOf(Object)
					expect(req.session.test_data).to.equal("TestingData")
					res.end('session got')

				})

				this.agent = request.agent(this.server)
			})

			afterEach(function () {
				// runs after each test in this block
				var session = app.use('Session/Middleware/StartSession')
				if (session.handled)
					session.store.stopInterval()
			})

			it ('should set session variable', function (done) {
				this.agent
					.get('/')
					.expect(200, 'session set', done)
			})

			it ('should get session variable', function (done) {
				this.agent
					.get('/return')
					.expect(200, 'session got', done)
			})

			before(function () {

				// Registering Config provider for test
				app.singleton('Config', function (app) {
					return {
						data: {
							app: {
								name: 'session-test',
								secret: 'apple-banana'
							},

							session: {
								store: StoreKeeper.generateStore('memory')
							}
						},

						get: function (key) {
							return _.get(this.data, key)
						}
					}
				})

			})

			var provider = new SessionProvider(app)

			it('should use function as store', function () {
				provider.register()
			})


		})

	})

})
