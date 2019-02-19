'use strict'

/**
 *  APPLICATION SERVICE PROVIDERS
 * -------------------------------
 *  Service Providers are like building blocks of the Framework. They are
 *  configured here and get registered only once. These providers can
 *  be used inside any file using `use()` keyword.
 */

const providers = [
	require('../../../providers/AuthProvider'),
	require('../../../providers/DatabaseProvider'),
	require('../../../providers/PackageProvider'),
	require('../../../providers/RoutingProvider'),
	require('../../../providers/SessionProvider'),
]

const cliProviders = [

]

const aliases = {
	Event: 'Axe/Events',
	Log: 'Axe/Log',
	Config: 'Axe/Config',
	Env: 'Axe/Env',

	Auth: 'Haluka/Auth',
	Database: 'Haluka/Database',
	Session: 'Haluka/Session',
	Route: 'Haluka/Routing/Route',
	Router: 'Haluka/Routing/Router'
}

const globalMiddleware = [
	'Haluka/Session/Middleware'
]

const namedMiddleware = {
	//
}

module.exports = { providers, cliProviders, aliases, middlewares: { globalMiddleware, namedMiddleware } }
