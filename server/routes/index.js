const router = require("express").Router()
const users = require("./route-users")
<<<<<<< HEAD
const routeCalender = require('./calender')
=======
const movies = require("./route-movie")
>>>>>>> development

router.get('/', (req, res) => {
  res.json({msg: "Hello from index"})
})

router.use('/users', users)
<<<<<<< HEAD
router.use('/calender', routeCalender)
=======
router.use('/movies', movies)
>>>>>>> development

module.exports = router