const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ab15cc2abc82aa9834b1e63964b339fe&query=' + latitude + ',' + longitude;
  request({ url, json: true }, (error, { body }) => {
    if(error){
      callback("Unable to connect to the weather service", undefined)
    }else if(body.error){
      callback("Unable to find location. Try another search", undefined)
    }else{
      callback(undefined, {
        temperature: body.current.temperature,
        precipitation: body.current.precip
      });
    }
  });
};

module.exports = forecast;