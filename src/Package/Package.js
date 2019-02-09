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
		var packageFile = path.join(packageDir, 'package.json')
		if (fs.existsSync(packageFile)) {
			var packageConfig = require(packageFile)
			var setup = packageConfig.main
			if (setup === undefined)
				throw new Error('Invalid Package Main Script for `' + name + '`.')
			var setupFile = path.join(packageDir, setup)
			if (fs.existsSync(setupFile)) {
				var setup = require(setupFile)
				return setup
			}else{
				throw new Error('Main file `' + setup + '` not found in `' + name + '` package')
			}
		}else{
			throw new Error('Invalid Package. `package.json` file not found in package root of `' + name + '`.')
		}

	}
}
