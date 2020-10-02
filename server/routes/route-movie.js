const router = require("express").Router()
const axios = require('axios')

//api themoviedb
router.get("/", (req, res, next)=>{
    axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=4f8d0668dd2725012395df54297fb76a'
    })
    .then(movies=>{
        let movieList = movies.data.results
        // console.log(movieList)
        res.status(200).json(
            movieList
        )
    })
    .catch(err=> next(err))
})

module.exports = router