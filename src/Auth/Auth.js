/**
 * @name Auth
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var Helpers = require('./Helpers')

/**
 * Auth Class
 */
class Auth {

	constructor (app) {

		// Setup Default Auth
		Helpers.setupDefault(app)
	}

	AuthenticationMiddleware (loginURL) {
		return Helpers.authCheckMiddleware(loginURL)
	}

}

module.exports = Auth
