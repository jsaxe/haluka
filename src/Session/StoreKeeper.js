/**
 * @name StoreKeeper
 * @author Robin Panta <hacktivistic@gmail.com>
 */


'use strict'

//Dependencies
var session = require('express-session')
var _ = require('lodash')

/**
  * StoreKeeper Helper
  */

var StoreKeeper = module.exports = {}

/**
 * Session Store Handler for memory based store
 */
StoreKeeper.MemoryStoreHandler = function (config) {
	checkConfig('memory', config)
	var MemoryStore = require('memorystore')(session)
	var store = new MemoryStore({
		checkPeriod: 86400000,
		ttl: config.ttl * 60 * 1000 || 3600 // (min to ms)
	})
	store.close = function () {
		store.stopInterval() // Stopping MemoryStore
	}
	return store
}

/**
 * Session Store Handler for file based store
 */
StoreKeeper.FileStoreHandler = function (config) {
	checkConfig('file', config)
	var FileStore = require('session-file-store')(session);

	var store = new FileStore({
		path: config.path,
		ttl: config.ttl * 60 || 360,  // ( min to seconds)
		reapAsync: true,
		reapSyncFallback: true
	})
	store.close = function () {
		clearInterval(store.options.reapIntervalObject)
	}
	return store
}


/**
 * Stores Registration
 */
StoreKeeper.stores = {
	memory: 	StoreKeeper.MemoryStoreHandler,
	file:		StoreKeeper.FileStoreHandler
}

/**
 * Build the pre-defined Session Store
 * @param {string} store
 */
StoreKeeper.generateStore = function (store) {
	if (_.has(this.stores, store)) {
		return this.stores[store]
	}else {
		throw new SessionStoreNotFoundError(store)
	}
}

class SessionStoreNotFoundError extends Error {
	constructor (store) {
		super()
		this.message = `The specified store '${store}' is not registered. Please check your config.`
	}
}

class InvalidSessionConfigError extends Error {
	constructor (further) {
		super()
		this.message = `Invalid Session Config Provided. ${further}`
	}
}

var checkConfig = (type, config) => {
	if (!config)
		throw new InvalidSessionConfigError('')

	if (type === 'file' && !config.path)
		throw new InvalidSessionConfigError('Config `session.path` not found.')

}
