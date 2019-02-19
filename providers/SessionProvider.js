/**
 * @name SessionProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../src/Haluka/ServiceProvider')
var Session = require('../src/Session/Session')

class SessionProvider extends ServiceProvider{

	register () {

		this.app.singleton('Haluka/Session', (app) => {
			var config = app.use('Axe/Config').get('session')
			return new Session(this._prepareConfig(config))
		})

		this.app.singleton('Haluka/Session/Middleware', (app) => {
			return app.use('Haluka/Session').getMiddleware()
		})
	}

	_prepareConfig (config) {
		var newConfig = {
			name: this.app.use('Env').get('APP_NAME', 'haluka_cookie'),
			secret: this.app.use('Env').get('APP_KEY', 'tuccha-tuccha'),
		}
		return Object.assign(config, newConfig)
	}

}

module.exports = SessionProvider
