const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const location = latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=3d0490aa5b7f8130b44b9fd122bc4aa7&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to web service.", undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast