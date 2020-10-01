const router = require("express").Router()
const users = require("./route-users")
const routeCalender = require('./calender')

router.get('/', (req, res) => {
  res.json({msg: "Hello from index"})
})

router.use('/users', users)
router.use('/calender', routeCalender)

module.exports = router