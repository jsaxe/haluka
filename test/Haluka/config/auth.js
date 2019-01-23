module.exports = {

	default: 'web',

	guards: {

		web: {

			strategy: 'local',
			uid: 'username',
			password: 'password'

		},

	},

	strategies: {

		local: (express, config) => {

		}

	}

}
