'use strict'

var expect = require('chai').expect;

var Database = require('../../src/Database/Database')

describe('Database', function () {

	var config = {
		default: 'mongodb',
		connections: {
			mongodb: {
				driver: 'mongoose',
				host: 'localhost',
				port: '27017',
				database: 'haluka',
				username: '',
				password: '',
			},
			mongo2: {
				driver: 'mongoose',
				host: 'localhost',
				port: '27017',
				database: 'haluka_test',
				username: '',
				password: '',
			},
		},
	}

	var app = {
		use: () => {
			return {
				fire: () => {
					return
				}
			}
		}
	}

	let db
	after(function () {
		db.closeAll()
	})

	describe('setup()', function () {

		it('should setup default db connection', async function () {
			var db1 = new Database({}, app)
			await db1.setup()

			var db2 = new Database({ default: 'random' }, app)
			await db2.setup()

			var db3 = new Database({ default: 'random', connections: {} }, app)
			await db3.setup()

			db = new Database(config, app)
			await db.setup()
		})
	})

	describe('default()', function () {

		it('should use default db connection', function () {
			db.default()
		})
	})

	describe('booted()', function () {
		it('should return true if booted', function () {
			expect(db.booted()).to.equal(true)
		})
	})

	describe('using()', function () {

		it('should use db connection', function () {
			db.using('default')
			db.using('mongo2')

			expect(()=> {
				db.using('random')
			}).throw(`No database connection exists  with name 'random'. Please check your database config.`)
			db.close('random')
		})
	})

})
