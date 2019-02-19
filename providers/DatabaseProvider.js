/**
 * @name DatabaseProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../src/Haluka/ServiceProvider')
var Database = require('../src/Database/Database')

class DatabaseProvider extends ServiceProvider{

	register () {

		this.app.singleton('Haluka/Database', function (app) {
			return new Database(app.use('Axe/Config').get('database'), app)
		})

	}

}

module.exports = DatabaseProvider
