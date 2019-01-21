'use strict'

module.exports =  {

	http: {

		trustProxy: true,

	},

	post: {

		limit: '1mb',

	},

	uploads: {

		multi: true,

		limit: '5mb'

	},

	views: {

		engine: 'pug',

		pug: (express) => {
			express.set('views', app().resourcesPath('views/pug'))
			express.set('view engine', 'pug')
		},

	}

}
