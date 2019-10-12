const request = require('request'); 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?country=US&access_token=pk.eyJ1IjoidGFuaXNoMjIiLCJhIjoiY2p6Mmxrd2kzMDczaDNjbHR0YmdwenlncyJ9.6IDswr4hMJVrtBOv5yufhg'
    
    request( {url, json : true}, (error, { body }) => {
        if(error){
            callback('unable to connect to location services ', undefined)
        }   

        else if(body.features.length === 0){
            callback('Unable to find location services', undefined)
        }
        else{   
            callback(undefined, {
                latitude : body.features[0].center[1], 
                longitude : body.features[0].center[0], 
                location : body.features[0].place_name  
            })
        }             
    })          
}                                                   

module.exports = geocode;


