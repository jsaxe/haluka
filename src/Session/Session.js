/**
 * @name Session
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var session = require('express-session')
var _ = require('lodash')

/**
 * Session Class
 */
class Session {

	constructor (config = {}) {

		var properties = ['store', 'stores', 'adapters']
		var isConfigValid = properties.every(function (item) {
			return config.hasOwnProperty(item)
		})

		if (!isConfigValid) {
			throw new Error('Invalid Session Config. Missing required params {store, stores, adapters}.')
		}

		var storeConfig = config.stores[config.store]
		if (!storeConfig) {
			throw new Error(`Config for store '${config.store}' not found.`)
		}

		if (!storeConfig.hasOwnProperty('adapter')) {
			throw new Error(`Store '${config.store}' doesn't implement a session adapter.`)
		}

		var adapterFn = config.adapters[storeConfig.adapter]
		if (typeof adapterFn !== 'function') {
			throw new Error(`Adapter '${storeConfig.adapter}' is not a function.`)
		}

		var sessionConfig = _.omit(config, ['store', 'stores', 'adapters'])
		sessionConfig.adapter = adapterFn
		sessionConfig.adapterConfig = _.omit(storeConfig, ['adapter'])

		this._config = sessionConfig
		this._handled = false
		this._store = null
		this._middleware = null

	}

	handled () {
		return this._handled
	}

	getStore () {
		return this._store
	}

	getMiddleware () {
		if (!this.handled()) {

			var store = this._config.adapter(session, this._config.adapterConfig)
			if (!store) {
				throw new Error(`Session adapter didn't return a store.`)
			}

			var sessionConfig = this._config
			if (Object.getPrototypeOf(store) !== Object.getPrototypeOf(session)) {

				if (typeof store.close !== 'function') {
					throw new Error(`Session adapter doesn't implement close() method.`)
				}

				sessionConfig.store = store

			}else {
				store.close = () => { return }
			}

			sessionConfig = _.omit(sessionConfig, ['adapter', 'adapterConfig'])

			this._store = store
			this._middleware = session(sessionConfig)
			this._handled = true
		}
		return this._middleware
	}

	destroy () {
		if (this.handled()) {
			this.getStore().close()
		}
	}

}

module.exports = Session
