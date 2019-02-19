'use strict'

module.exports = {

	uses: 'file',

	transports: {

		console: {
			//
		},

		file: {
			filename: app().storagePath('logs/pico.log')
		}

	}

}
