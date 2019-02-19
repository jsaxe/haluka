/**
 * @name PackageProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../src/Haluka/ServiceProvider')
var Package = require('../src/Package/Package')

class PackageProvider extends ServiceProvider{

	register () {

		this.app.singleton('PackageLoader', function (app) {
			return Package.load(app.basePath())
		})

	}

}

module.exports = PackageProvider
