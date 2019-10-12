
const request = require('request');
 
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0c5c91f95c6ecb75fc3ee0c41a564976/' + latitude + ',' + longitude;

    request( {url, json : true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather forecast services..', undefined);
        }
        else if(body.error){
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.' + ' There is a ' + body.currently.precipProbability + ' chance of rain.')
        }
    } )                
}

module.exports = forecast;
