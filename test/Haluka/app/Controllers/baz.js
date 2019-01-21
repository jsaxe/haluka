'use strict'

var router = use('Router')


router.get('/', (req, res) => {
	res.end('Found!')
})


module.exports = router
