const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFuc2FscmFnaGF2MTkiLCJhIjoiY2s2NHdrMXNvMGpjMzNtbzdyejE0b29iZSJ9.Hd1e1ZgkTgwTkGn52d-XJA'
    request({url,json: true},(req,{body}) => {
        if(req){
            callback('Unable to Connect to Services',undefined)
        }else if(body.features.length === 0){
            callback('Location Not Found',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}  

module.exports = geocode