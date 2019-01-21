'use strict'

module.exports = {

	// Session store to be used. Can be [Function] or String (memory|file)

	store: 'memory',

	// You may add session config as per the docs of `express-session` module.

	saveUninitialized: false,

	ttl: '10',  // in minutes

	resave: true,

	unset: 'destroy',

	cookie: {

		httpOnly: true,
		sameSite: true,
		secure: false

	},

	stores: {

		memory: {

			checkPeriod: 86400000

		},

		file: {

			path: '',
			reapAsync: true,
			reapSyncFallback: true

		}

	}

}
