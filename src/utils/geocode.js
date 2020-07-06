const request = require('request');


const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(city)+'.json?access_token=pk.eyJ1IjoicmF2aWt1bWFydCIsImEiOiJja2MwZnUzM2oxY3FwMnJuYTlyMjd3Y2dxIn0.TLzpayFMnr3fhRpxrIitNQ';
    
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Something went wrong or No internet Connection', undefined); 
        } else if(body.features.length == 0){
            callback('City Not Found', undefined);
        }else {
            var data = {
                lat: body.features[0].center[1],
                lang: body.features[0].center[0],
                city: city
            }
            
            callback(undefined , data);
        }
    });    
}

module.exports = geocode;

