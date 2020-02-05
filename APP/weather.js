const request = require('request')
const geocode = require('./geocode.js') 
const forecast = require('./forecast.js')

const address = process.argv[2]

if(!address){
    return console.log('Please Provide an address')
}else{
    geocode(address,(error,{longitude,latitude,location}) => {
        if(error){
            return console.log(error)
        }
        forecast(latitude, longitude, (error,res) => {
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(res)
        })
    })
}
