/**
 * @name AuthProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var Auth = require('./Auth')

class AuthProvider extends ServiceProvider{

	register () {

		this.app.singleton('Auth', function (app) {
			return new Auth(app)
		})

	}

}

module.exports = AuthProvider
