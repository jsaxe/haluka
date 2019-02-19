'use strict'

module.exports =  {

	http: {
		trustProxy: true,
	},

	static: app().publicPath(),

	post: {
		limit: '1mb',
	},

	uploads: {
		multi: true,
		limit: '5mb'
	},

	views: {

		default: 'pug',

		pug: (express) => {
			express.set('views', app().resourcesPath('views'))
			express.set('view engine', 'pug')
		},

	}

}
