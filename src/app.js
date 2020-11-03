const path = require('path');
const express = require('express');


const app = express(); 
const publicDirectoryPath = path.join(__dirname, '../public');
const robotURL = path.join(__dirname, '../public/img/robot.png');
console.log(robotURL);

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'This is the About page...',
    robotURL: robotURL
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: "HELP PAGE"
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});