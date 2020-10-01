const router = require("express").Router()
const users = require("./route-users")

router.get('/', (req, res) => {
  res.json({msg: "Hello from index"})
})

router.use('/users', users)

module.exports = router