const axios = require('axios')

class CalenderController {
    static getHoliday(req, res) {
        axios({
            method: 'get',
            url: `https://calendarific.com/api/v2/holidays?api_key=73e908957f6078d58186d94fe7e98c2c7062fee9&country=ID&year=2020`
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