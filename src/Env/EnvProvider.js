/**
 * @name EnvProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var Env = require('./Env')

class EnvProvider extends ServiceProvider{

	register () {

		this.app.singleton('Env', function (app) {
			return new Env(app.basePath('.env'))
		})

	}

}

module.exports = EnvProvider
