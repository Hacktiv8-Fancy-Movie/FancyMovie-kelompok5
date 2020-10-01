const router = require("express").Router()
const axios = require('axios')

//api themoviedb
router.get("", (req, res, next)=>{
    console.log(req.query.q);
    let {keyword} = req.params
    axios({
        method: 'GET',
        url: `https://api.deezer.com/search?q=${keyword}`
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