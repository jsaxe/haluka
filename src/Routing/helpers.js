'use strict'

// Dependencies

var Helpers = module.exports = {}
var routes = []


Helpers.pointRoute = function (path, controller) {
	routes.push({
		path: path,
		controller: controller
	})
}

Helpers.mapRoutes = function (express) {
	routes.map((route, idx) => {
		if (!route.controller) {
			route.controller = (req, res) => { res.end('Invalid Controller Method provided for this route.') }
		}else{
			if (Object.getPrototypeOf(route.controller) !== Object.getPrototypeOf(require('express').Router()))
		 		route.controller = (req, res) => { res.end('Invalid Controller. Router not exported! Tip: Did you forget `module.exports = router`') }

		}
		express.use(route.path, route.controller)
	})
}
