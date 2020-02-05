const request = require('request')

const forecast = (lat,lon,callback) =>{
    const url ='https://api.darksky.net/forecast/d3b73ec8f3387409bc23209bea135e03/'+lat+','+lon 
    request({url,json: true}, (req,{body}) => {
        if(req){
            callback('Unable to Connect to Services',undefined)
        } 
        else if(body.error){
            callback('Unable to find Location',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast