const router = require("express").Router()
const users = require("./route-users")
const routeCalender = require('./calender')
const movies = require("./route-movie")
const musics = require("./route-music")
const authetication = require('../middlewares/authentication')

router.get('/', (req, res) => {
  res.json({msg: "Hello from index"})
})

router.use('/users', users)

router.use(authetication)
router.use('/calender', routeCalender)
router.use('/movies', movies)
router.use('/musics', musics)

module.exports = router