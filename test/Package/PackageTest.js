'use strict'

var expect = require('chai').expect;

var Package = require('../../src/Package/Package')

describe('Package', function () {

	describe('load()', function () {
		var load = Package.load(__dirname)

		it('should throw error when package doesn\'t exist', function () {
			expect(() => {
				load('test1')
			}).to.throw('Invalid Package. `haluka.json` file not found in package root of `test1`.')
		})

		it('should throw error when setup config doesn\'t exist', function () {
			expect(() => {
				load('test2')
			}).to.throw('Invalid Package Setup Script for `test2`.')
		})

		it('should throw error when setup file doesn\'t exist', function () {
			expect(() => {
				load('test3')
			}).to.throw('Setup file `setup.js` not found in `test3` package')
		})

		it('should successfully load package', function () {
			var pack = load('test-package')
			expect(pack.doJob(1, 2)).to.equal(3)
		})

	})

})
