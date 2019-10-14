    //  dependencies

const path = require('path');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

    //  Defining Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  Setting up a static directory and to customise a server 
app.use(express.static(publicDirectoryPath));

    //  Setting up handlebars engine and views location
app.set('view engine', 'hbs')  
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)     
//  changing the path to use the templates folder rather than views 

//  home page
app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather',
        name: 'Tanish'  
    })   
})

//  help page 
app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'Some Helpful text',  
       title: 'Help Page',
       name: 'Tanish' 
    });
})

//  about page
app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About Me',
        name: 'Tanish'
    });
})

//  weather page
app.get('/weather', (req, res) => {
        if(!req.query.address){
            return res.send({
                error : 'You must provide an address !'
            })
        }   

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send( {error} )
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send( {error} )
                }

                res.send({ 
                    forecast : forecastData,
                    location,
                    address : req.query.address
                })
            })
        })                   
    }          
)

//  setting up a help 404
app.get('/help/*', (req, res) => {
    res.render('page404', {
        title: 404,
        name: 'Tanish',
        errorMessage: 'Help article not found'
    })
})

//  setting up a 404 (page not found)
app.get('*', (req, res) => {
    res.render('page404', {
        title: 404,
        name: 'Tanish',
        errorMessage: 'Page not found' 
    })          
}) 

//  products page 
app.get('/product', (req, res) => {
    res.render('product', {
        iem: 'Beyerdynamic'
    })   
})

//  starting a server
app.listen(port, () => { 
    console.log('Our server is up and running on port no.' + port);    
});          

