const path = require('path');
const express  = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const views = path.join(__dirname, '../templates')

app.set('view engine', 'hbs');
app.set('views', views)
//app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res) => {
    res.render('index', {
        'title': "Weather App",
        'name': 'Ravi'
    });
})


app.get('/about', (req,res) => {
    res.render('about', {
        'title': "Weather App About",
        'name': 'Ravi'
    });
})


app.get('/help', (req,res) => {
    res.render('about', {
        'title': "Weather App Help",
        'name': 'Ravi'
    });
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        res.send( {
            'error': 'Please provide address'
        });
    } else {
        geocode(req.query.address, (error, data = {}) => {
            if(error) {
                return res.send({error});
            } 
            forecast(data,(error, foreCastData) => {
                if(error){
                    return res.send({error});
                }
                
                res.send( {
                    'forecasts': 'Forecasts',
                    'Location': req.query.address,
                    'Description': foreCastData.weather[0].description
                });
            })
        })
        
    }
})

app.get('/products', (req,res) => {
    res.send( {
        'products': []
    });
})
app.get('*', (req,res) => {
    res.render('404', {
        'title': "404 Page Not Found",
        'name': 'Ravi'
    });
})

app.listen(3000, () => {
    console.log('Server running at: 3000');
});