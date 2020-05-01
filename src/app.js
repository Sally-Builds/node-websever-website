const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars and engne and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDir))




app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Sally nwamama'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is some Helpful text',
        title: 'Help',
        name: 'Sally nwamama'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Sally nwamama'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You have to input something!!!'
        })
    } 
    
    const input = req.query.address
    
    geocode(input, (error, {lat, lon, loc} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
          forecast(lat, lon, (error, {temp,feelsLike}) => {
            if(error){
              return res.send({
                  error
              })
            }
            return res.send({
                forecast: `the temperature is ${temp}F `,
                location: `${loc}`,
                address: input
            })
          })
          
      })    
    // res.send({
    //     forecast: '34 deg F',
    //     location: 'Mayor, New layout Enugu',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
      return  res.send({
            error: 'You must provide something'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})




app.get('/help/*', (req,res) => {
    res.render('404Page', {
        title: '404 Error',
        name: 'Sally nwamama',
        message: 'Help article Not found!!!'
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404 Error',
        name: 'Sally nwamama',
        message: '404 error: Page Not found!!!'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

