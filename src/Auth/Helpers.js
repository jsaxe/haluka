'use strict'

// Dependencies

var Helpers = module.exports = {}

Helpers.setupDefault = function (app) {
	var config = app.use('Config').get('auth')
	var guardConfig = config.guards[config.default]

	var strategyMethod = config.strategies[guardConfig.strategy](app.getExpress(), guardConfig)

	app.map('DefaultGuard', strategyMethod)
}
