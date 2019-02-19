'use strict'

var Auth = require('../../src/Auth/Auth')

describe('Auth', function () {

	describe('constructor', function () {

		it('should setup auth', function () {
			new Auth(app)
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
	getExpress: () => {},
	map: () => {}
}
