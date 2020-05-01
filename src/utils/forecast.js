const request = require('request')



const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a38f5d375023158f622ae172ff99a636&query=${lat},${lon}&units=f`
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('No internet Connection', undefined)
        }else if(body.error){
            callback('Invalid Data!!!!', undefined)
        }else{
            callback(undefined, {
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                obTime: body.current.observation_time
            })
        }
    })
}

module.exports = forecast