const request  = require('request');


const geocode = (add, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(add)}.json?access_token=pk.eyJ1Ijoic2FsbHlud2FubmUiLCJhIjoiY2s5aXhldnBjMDIwcTNlcDV1ODFhaW1wbSJ9.rN6pLYGgotOdhh4n0a6Xjw&limt=1`
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callBack('Unable to connect', undefined)
        }else if(body.features.length === 0){
            callBack('Invalid seatch', undefined)
        }else{
            callBack(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode