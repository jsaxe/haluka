'use strict'

var expect = require('chai').expect
var Session = require('../../src/Session/Session')

describe('Session', function () {


	describe('constructor', function () {

		it('should throw error when no config provided', function () {

			expect(() => {
				new Session()
			}).to.throw('Invalid Session Config. Missing required params {store, stores, adapters}.')

		})

		it('should throw error when config for store not found', function () {

			expect(() => {
				new Session({
					store: 'foo',
					stores: {
						//1337
					},
					adapters: {
						// geez
					}
				})
			}).to.throw(`Config for store 'foo' not found.`)

		})

		it('should throw error when store doesn\'t implement an adapter', function () {

			expect(() => {
				new Session({
					store: 'foo',
					stores: {
						foo: {
							// 1337
						}
					},
					adapters: {
						// geez
					}
				})
			}).to.throw(`Store 'foo' doesn't implement a session adapter.`)

		})

		it('should throw error when adapter isn\'t a function', function () {

			expect(() => {
				new Session({
					store: 'foo',
					stores: {
						foo: {
							adapter: 'bar'
						}
					},
					adapters: {
						// geez
					}
				})
			}).to.throw(`Adapter 'bar' is not a function.`)

		})

		it('should create session service', function () {

			new Session({
				store: 'foo',
				stores: {
					foo: {
						adapter: 'bar'
					}
				},
				adapters: {
					bar: function () {
						var store =  {}
						store.close = () => { return }
						return store
					}
				}
			})

		})


	})

	describe('getMiddleware()', function () {

		let config = {

			store: 'foo',

			saveUninitialized: false,
			resave: false,
			unset: 'destroy',
			cookie: {
				httpOnly: true,
				sameSite: true,
				secure: false
			},

			stores: {

				foo: {
					adapter: 'bar'
				},

				baz: {
					adapter: 'bat'
				},

				memory: {
					adapter: 'memorystore',
				},

				newstore: {
					adapter: 'newadapter'
				}

			},

			adapters: {

				bar: function (expressSession, config) {

				},

				bat: function (expressSession, config) {
					return {}
				},

				memorystore : function (expressSession, config) {

					return expressSession
				},

				newadapter: function (expressSession, config) {

					var store = {
						on: () => {}
					}
					store.close = () => {return}
					return store

				}

			}

		}

		it ('should throw error if adapter doesn\'t return a valid store', function () {

			expect(() => {
				var session = new Session(config)
				session.destroy()
				session.getMiddleware()
			}).to.throw(`Session adapter didn't return a store.`)

		})

		it ('should throw error if adapter doesn\'t implement close() method', function () {

			expect(() => {
				config.store = 'baz'
				var session = new Session(config)
				session.getMiddleware()
			}).to.throw(`Session adapter doesn't implement close() method.`)

		})

		it('should return session middleware object', function () {

			config.store = 'memory'
			var session = new Session(config)
			session.getMiddleware()
			session.getMiddleware()
			session.destroy()

			config.store = 'newstore'
			session = new Session(config)
			session.getMiddleware()
			session.destroy()

		})



	})

})
