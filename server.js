// MODULES /////////////////////////////////////////////////////////
// Third party modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// APPLICATION ////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
var app = express();

// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Register helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Set Handlebars as the default view engine in Express
app.set('view engine', 'hbs');

// Configure Express middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// Render maintenance page 
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Express App - Maintenance',
//         message: 'Site down for maintenance. Back soon.'
//     });
// });
// Load static pages
app.use(express.static(__dirname + '/public'));

// HTTP routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Express Website Home',
        welcomeMessage: 'This page is using Express and Handlebars templates',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is not a valid URL.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
    });
});

// HTTP listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});