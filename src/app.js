const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); 

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "Christian Montero"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: "Christian Montero"
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help page",
    name: "Christian Montero"
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an Address'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error){
      return res.send({
        error: error
      })
    }
    forecast(latitude , longitude, (error, { temperature, precipitation }) => {
      if(error){
        return res.send({
          error: error
        })
      }
      res.send({
        forecast: `The temperature in is ${temperature} and is ${precipitation}% chance to rain`,
        location: location
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: "Help article not found.",
    name: "Christian Montero"
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: "Page not found.",
    name: "Christian Montero"
  });
});


app.listen(3000, () => {
  console.log("Server is up on port 3000");
});