/**
 * @name Database
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var Helpers = require('./helpers')

class Database {

	constructor (config, app) {
		this.config = config
		this.app = app
		this._booted = false;
		this.connections = []
	}

	async setup () {
		// Setup All Database
		for (var conn in this.config.connections) {
			var connection = this.config.connections[conn]
			this.connections[conn] = await Helpers.createConnection(connection)
			this.app.use('Axe/Events').fire('Database.Connected', conn, connection)
		}
		if (!!this.config['default'] && !!this.config['connections'] && this.config.default in this.config['connections']) {
			this.connections['default'] = this.connections[this.config.default]
		}
		this._booted = true;
	}

	booted () {
		return this._booted
	}

	default () {
		return this.connections['default']
	}

	using (conn) {
		if (this.connections[conn])
			return this.connections[conn]
		else
			throw new Error(`No database connection exists  with name '${conn}'. Please check your database config.`)
	}

	async close (conn) {
		if (!!this.connections[conn])
			await (this.connections[conn]).close()
	}

	async closeAll () {
		for (var conn in this.connections) {
			await this.close(conn)
		}
	}

}

module.exports = Database
