/**
 * @name AuthProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../src/Haluka/ServiceProvider')
var Auth = require('../src/Auth/Auth')

class AuthProvider extends ServiceProvider{

	register () {

		this.app.singleton('Haluka/Auth', function (app) {
			return new Auth(app)
		})

	}

}

module.exports = AuthProvider
