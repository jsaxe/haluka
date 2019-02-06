/**
 * @name Package
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

const fs = require('fs')
const path = require('path')
/**
 * Package
 * Load and access Packages
 *
 */
var Package = module.exports = {}

/**
 * Provides with loader function to load packages
 *
 * @param {string} basePath
 * @returns {Closure}
 *
 */
Package.load = function(basePath) {
	var halukaDir = path.join(basePath, 'haluka_packages')
	return (name) => {
		var packageDir = path.join(halukaDir, name)
		var packageFile = path.join(packageDir, 'haluka.json')
		if (fs.existsSync(packageFile)) {
			var packageConfig = require(packageFile)
			var setup = packageConfig.setup
			if (setup === undefined)
				throw new Error('Invalid Package Setup Script for `' + name + '`.')
			var setupFile = path.join(packageDir, setup)
			if (fs.existsSync(setupFile)) {
				var setup = require(setupFile)
				return setup
			}else{
				throw new Error('Setup file `' + setup + '` not found in `' + name + '` package')
			}
		}else{
			throw new Error('Invalid Package. `haluka.json` file not found in package root of `' + name + '`.')
		}

	}
}
