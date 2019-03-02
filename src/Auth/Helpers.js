'use strict'

// Dependencies

var Helpers = module.exports = {}

Helpers.setupDefault = function (app) {
	var config = app.use('Config').get('auth')
	var guardConfig = config.guards[config.default]

	var strategyMethod = config.strategies[guardConfig.strategy](app.getExpress(), guardConfig)

	app.map('DefaultGuard', strategyMethod)
}


Helpers.authCheckMiddleware = function (returnTo) {
	// Authentication Middleware
	return function (req, res, next) {
		 /* istanbul ignore next */ 
		if  (!req.isAuthenticated || !req.isAuthenticated()) {
			if (req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}
			return res.redirect(returnTo);
		}
		next();
	}

}
