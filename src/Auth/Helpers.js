'use strict'

// Dependencies

var Helpers = module.exports = {}

Helpers.setupDefault = function (app) {
	var config = app.use('Config').get('auth')
	var guard = Helpers[`${config.default}Guarder`](config.guards[config.default])
	app.map('DefaultGuard', guard)
}

Helpers.webGuarder = function (config) {
	//Passport
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;

	// User Model
	var User = use(config.model)

	// Passport configs
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	// Registering Passport
	app().getExpress().use(passport.initialize());
	app().getExpress().use(passport.session());

	return passport
}
