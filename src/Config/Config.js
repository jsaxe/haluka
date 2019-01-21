/**
 * @name Config
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var requireAll = require('require-all')
var _ = require('lodash')

/**
 * Config Class
 */
class Config {

	/**
	 * Constructor
     *
     * @param {String} configPath path of config directory
	 */
	constructor (configPath) {
		this.config = {}
		this._configPath = configPath
		this._configPreloader()
	}

	/**
	 * Config loading function
	 * @private
	 */
	_configPreloader () {
		this.config = requireAll({
			dirname: this._configPath,
			filter: /(.*)\.js$/
		})
	}

	/**
	 * Fetch config key from config file
	 *
	 * @param {String} key
	 * @param {Mixed} defaultValue
	 *
	 * @return {Mixed}
	 *
	 * @example
	 * Config.get('session.cookie')
	 *
	 * @public
	 */
	get(key, defaultValue) {
		return _.get(this.config, key, defaultValue)
	}

}

module.exports = Config
