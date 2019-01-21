/**
 * @name SessionMiddleware
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var session = require('express-session')
var _ = require('lodash')

/**
 * Session Middleware Class
 */
class SessionMiddleware {

	constructor (store, config) {
		this.config = config
		this.rawStore = store
		this.session = null
	}

	handle () {
		this.handled = true
		var store = this.rawStore(this.config.stores[this.config.store])
		var config = Object.assign(_.cloneDeep(this.config), {
			store: store
		})
		this.session = session(config)
		this.store = store
		return this.session
	}

}

module.exports = SessionMiddleware
