const request = require('request');


const forecast = ({lat, lang}, callback) => {
    const url = 'https://samples.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lang+'&appid=439d4b804bc8187953eb36d2a8c26a02';
    
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Something went wrong or No internet Connection', undefined); 
        } else if(body.cod == 404){
            callback('Data Not Found', undefined);
        }else {
            callback(undefined , body);
        }
    });    
}

module.exports = forecast;

