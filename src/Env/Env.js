/**
 * @name Env
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var dotenv = require('dotenv')

/**
 * Env Class
 * Load and access Environment Variables
 *
 * @class
 */
class Env {

	/**
	 * Constructor
	 *
	 * @param {String} envFilePath
	 */
	constructor (envFilePath) {
		dotenv.config({
			path: process.env.ENV_PATH || envFilePath
		})
	}

	/**
	 * Return environment value from environment file
	 *
	 * @param {String} key
	 * @param {Mixed} defaultValue
	 *
	 * @return {Mixed}
	 *
	 * @example
	 * Env.get('APP_NAME')
	 * Env.get('CACHE_ROUTES', true)
	 *
	 * @public
	 */
	get(key, defaultValue) {
		var val = process.env[key] || defaultValue
		if (val === 'true' || val === '1') {
			return true
		}
		if (val === 'false' || val === '0') {
			return false
		}
		return val
	}

}

module.exports = Env
