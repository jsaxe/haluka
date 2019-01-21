/**
 * @name ConfigProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var Config = require('./Config')

class ConfigProvider extends ServiceProvider{

	register () {

		this.app.singleton('Config', function (app) {
			return new Config(app.configPath())
		})

	}

}

module.exports = ConfigProvider
