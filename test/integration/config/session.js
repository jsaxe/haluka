'use strict'

var env = use('Env')

module.exports = {

	store: env.get('SESSION_STORE', 'memory'),

	saveUninitialized: false,
	resave: false,
	unset: 'destroy',
	cookie: {
		httpOnly: true,
		sameSite: true,
		secure: false
	},

	stores: {

		memory: {
			adapter: 'memorystore',
		},

		file: {
			adapter: 'file',
			path: '',
			reapAsync: true,
			reapSyncFallback: true
		},


	},

	adapters: {

		memorystore : function (expressSession, config) {
			return expressSession
		},

		file: function (expressSession, config) {

			var FileStore = require('session-file-store')(expressSession);
			var store = new FileStore(config)
			store.close = function () {
				clearInterval(store.options.reapIntervalObject)
			}
			return store

		}

	}

}
