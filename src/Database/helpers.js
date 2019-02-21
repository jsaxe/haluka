'use strict'

// Dependencies

var Helpers = module.exports = {}

Helpers.createConnection = async function (app, connection, config) {
	var driver = config.driver
	var conn = await Helpers[`${driver}Connector`](config)
	app.use('Axe/Events').fire('Database.Connected', connection, config)
	return conn
}

Helpers.mongooseConnector = async function (config) {
	var mongoose = require('mongoose')
	var connString = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
	var conn = await mongoose.createConnection(connString, Object.assign({ useNewUrlParser: true }, config.options))
	return conn
}
