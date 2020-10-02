const router = require('express').Router()
const CalenderController = require('../controllers/CalenderController')

router.get('/', CalenderController.getHoliday)

module.exports = router