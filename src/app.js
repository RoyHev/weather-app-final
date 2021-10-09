const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// making sure that index.html is loaded in the root.
// setup static directory to serve.
app.use(express.static(publicDirectoryPath))

// setup handle bars views and engine.
// set a value for a given express value key value pairs.
// getting handlebars set up.
app.set('view engine', 'hbs')
// changing the default views directory to our choosing.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//in order to use the view engine we only need to provide it with the name of the file without an extention
// since it knows to look for it in the views directory (this is hard coded)
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Roy Hevrony"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Roy Hevrony"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        description: "This is a help page for anyone who needs it.",
        title: "Help",
        name: "Roy Hevrony"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided.'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })

    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Roy Hevrony",
        title: "404",
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        name: "Roy Hevrony",
        title: "404",
        errorMessage: "Page not found."
    })
})
app.listen(port, () => {
    console.log("Server is up on port." + port)
})

