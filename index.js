/**
 * haluka
 * Copyright(c) 2019
 * MIT Licensed
 *
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

/**
 * Bootstrapping out Library
 */
var Haluka = require('./src/Haluka/Haluka')
var ServiceProvider = require('./src/Haluka/ServiceProvider')

module.exports = Haluka
module.exports.ServiceProvider = ServiceProvider
