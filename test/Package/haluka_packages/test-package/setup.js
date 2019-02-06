/**
 * Haluka Package Setup File
 */

// Code in this file gets run while installing the package. Afterwards this file has no significance.
// Package Logic shall be in `index.js`

var Package = module.exports = {}

Package.doJob = (a, b) => {
	return a + b
}
