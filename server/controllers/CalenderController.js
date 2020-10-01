const axios = require('axios')

class CalenderController {
    static getHoliday(req, res) {
        axios({
            method: 'get',
            url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.calendarificAPIkey}&country=ID&year=2020`
        })
        .then(response => {
            let holidays = response.data.response.holidays
            // console.log(holidays)
            res.status(200).json({holidays})
        })
        .catch (err => {
            res.status(500).json({err})
        })
    }
}

module.exports = CalenderController