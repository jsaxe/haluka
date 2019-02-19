'use strict'

// Application Data

const AppData = require('./app/app')
const Haluka = require('../../src/Haluka/Haluka')

// Booting the app
var app = new Haluka('test/integration')

// Slash with Axe
app.slash(AppData,
	function () {

		// Bootstrap Server
		app.bootstrapServer(AppData.middlewares)

		// Blade Providers
		use('Event')
		use('Log')
		use('Config')
		use('Env')

		// Haluka Providers
		use('Auth')
		use('Database')
		use('PackageLoader')
		use('Route').to('home')
		use('Router')
		use('Session')

	})

module.exports = app
