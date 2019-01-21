/**
 * @name DatabaseProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Haluka/ServiceProvider')
var Database = require('./Database')

class DatabaseProvider extends ServiceProvider{

	register () {

		this.app.singleton('Database', function (app) {
			return new Database(app.use('Config').get('database'), app)
		})

	}

}

module.exports = DatabaseProvider
