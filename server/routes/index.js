const router = require("express").Router()
const users = require("./route-users")
const movies = require("./route-movie")

router.get('/', (req, res) => {
  res.json({msg: "Hello from index"})
})

router.use('/users', users)
router.use('/movies', movies)

module.exports = router