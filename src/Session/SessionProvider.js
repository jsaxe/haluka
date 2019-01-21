/**
 * @name SessionProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var StoreKeeper = require('./StoreKeeper')
var StartSession = require('./Middleware/StartSession')

class SessionProvider extends ServiceProvider{

	register () {

		// Session Store
		this.app.singleton('Session/SessionStore', (app) => {
			var store = app.use('Config').get('session.store')
			if (typeof store === 'function') {
				return store
			}
			return StoreKeeper.generateStore(store)
		})

		// Session Middleware
		this.app.singleton('Session/Middleware/StartSession', (app) => {
			var config = app.use('Config').get('session')
			return new StartSession(app.use('Session/SessionStore'), this._prepareConfig(config))
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
