'use strict'

var expect = require('chai').expect;

var StoreKeeper = require('../../src/Session/StoreKeeper')

describe('StoreKeeper', function () {

	it('should provide Store functions', function () {

		expect(StoreKeeper.MemoryStoreHandler).to.be.instanceOf(Function)
		expect(StoreKeeper.FileStoreHandler).to.be.instanceOf(Function)
		expect(StoreKeeper.generateStore).to.be.instanceOf(Function)

	})

	describe('generateStore()', function () {

		it('should throw when store not found', function () {

			expect(() => {
				StoreKeeper.generateStore('random')
			}).to.throw()

		})

		it('should return store method when store found', function () {

			expect(() => {
				var storeMethod = StoreKeeper.generateStore('memory')
				expect(storeMethod).to.be.instanceof(Function)
			}).to.not.throw()

		})

	})

	describe('MemoryStoreHandler()', function () {

		afterEach(function () {
			if (this.store)
				this.store.stopInterval() // Stopping MemoryStore
		})

		it('should throw when config not provided', function () {

			expect(() => {
				this.store = StoreKeeper.MemoryStoreHandler()
			}).to.throw()

		})

		it('should return memory based store', function () {

			var config = {

			}
			this.store = StoreKeeper.MemoryStoreHandler(config)

		})

	})

	describe('FileStoreHandler()', function () {

		afterEach(function () {
			if (this.store) {
				clearInterval(this.store.options.reapIntervalObject)
			}
		})

		it('should throw when config not provided', function () {

			expect(() => {
				this.store = StoreKeeper.FileStoreHandler()
			}).to.throw()

		})

		it('should throw when session path not provided', function () {

			expect(() => {
				this.store = StoreKeeper.FileStoreHandler({
					store: 'file'
				})
			}).to.throw()

		})


		it('should return file based store', function () {

			var config = {
				store: 'file',
				path: __dirname + '/sessions'
			}
			this.store = StoreKeeper.FileStoreHandler(config)


		})

	})

})

