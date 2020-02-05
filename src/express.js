const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const loc = path.join(__dirname,'../Public')
const template_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', template_path)
hbs.registerPartials(partials_path)

app.use(express.static(loc))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Raghav Bansal'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Raghav Bansal'
    })
}) 

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    } 
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        } 
        forecast(latitude, longitude,(error, forecastD) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastD,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*',(req,res) => {
    res.send('404 Page Not Found')
})

app.listen(8080,() => {
    console.log('Server is Running')
})