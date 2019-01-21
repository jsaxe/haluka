'use strict'

module.exports = {

	default: 'mongodb',

	connections: {

		mongodb: {
			driver: 'mongoose',
			host: 'localhost',
			port: '27017',
			database: 'haluka',
			username: '',
			password: '',
		},

	},

	migrations: 'migrations'

}
