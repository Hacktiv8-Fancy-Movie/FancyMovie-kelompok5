const router = require("express").Router()
const axios = require('axios')

//api themoviedb
router.get("/chart", (req, res, next)=>{
    axios({
        method: 'GET',
        url: `https://api.deezer.com/chart`
    })
    .then(response=>{
        let musicList = response.data
        console.log(musicList)
        res.status(200).json(
            musicList
        )
    })
    .catch(err=> next(err))
})

module.exports = router