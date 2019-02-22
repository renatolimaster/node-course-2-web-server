const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}`);
  fs.appendFile('server.log', log + '\n', error => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// USE WITHOUT NEX() TO PREVENT TO EXECUTE THE APP IF SOMETHING GOES WRONG
/* app.use((req, res, next) => {
  res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('geteCurrentYear', () => {
  return new Date().getUTCFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  res.send({
    name: 'Renato',
    likes: ['Biking', 'Cities']
  });
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    wellcome: 'Welcome on Some Website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
