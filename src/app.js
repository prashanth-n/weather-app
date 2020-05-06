const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geocode');
//Define path for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
//setting up handlebars and veiews location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//setting up static path
app.use(express.static(publicPath));
//app routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prasanth N'
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Prasanth N'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some help messages goes here',
        title: 'Help',
        name: 'Prasanth N'
    });
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address/location'
        })    
    }
    geoCode.geoCode(req.query.address, (error, { lat, lng, placeName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        geoCode.forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location: placeName
            })
        })
    })
   
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Prasanth N',
        title:'404'
    })
})
app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        error: 'Page not found',
        name: 'Prasanth N'
    })
})
app.listen(3000, () => {
    console.log('Server is running on port 3000')
});