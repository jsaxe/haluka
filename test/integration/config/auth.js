'use strict'

module.exports = {

	default: 'web',
	guards: {
		web: {
			strategy: 'local',
		},

	},

	strategies: {

		local: function (express, config) {

			return {}

		}

	}

}
