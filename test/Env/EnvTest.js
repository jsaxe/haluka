'use strict'

var expect = require('chai').expect;

var Env = require('../../src/Env/Env')
var Application = require('../../src/Haluka/Haluka')

describe('Env', function () {

	var app = new Application('test/Env/TestBasePath')
	var env = new Env(app.basePath('.env.test'))

	describe('get()', function () {

		it('should fetch the environment variable', function () {

			var expectedValue = 'Haluka Test'
			expect(env.get('APP_NAME')).to.equal(expectedValue)

		})

		it('should return default value when key is not found', function () {
			expect(env.get('APP_KEY', 'tutti')).to.equal('tutti')
		})

		it('should return boolean value for text true/false or 1/0 values in env file', function () {

			expect(env.get('CACHE_ROUTES')).to.equal(true)
			expect(env.get('CACHE_VIEWS')).to.equal(false)
			expect(env.get('HAS_LOGIN')).to.equal(true)
			expect(env.get('HAS_OAUTH')).to.equal(false)

		})

	})

})
