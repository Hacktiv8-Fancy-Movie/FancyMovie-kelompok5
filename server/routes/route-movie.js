const router = require("express").Router()
const axios = require('axios')

//api themoviedb
router.get("/", (req, res, next)=>{
    console.log('tes')
    axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=4f8d0668dd2725012395df54297fb76a'
    })
    .then(movies=>{
        res.status(200).json(
            movies.data.results
        )
    })
    .catch(err=> next(err))
})

module.exports = router