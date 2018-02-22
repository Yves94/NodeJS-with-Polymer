// Node.js notation for importing packages
var express = require('express');
var config = require('./config');
var jwt = require('jsonwebtoken');

// Spin up a server
var app = express();

// Serve static files from the main build directory
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// Check specific page
app.get('/question', isLogin, function (request, response) {
    console.log('Question.');
    response.sendFile(config.appPath, { root: '.', headers: { page: request.originalUrl } });
});

app.post('/login', function(request, response) {
    var token = jwt.sign({'sub': 'login', 'iss': 'John Doe', 'aud': 'admin'}, config.secret);

    response.json({
        token: token
    });
});

// Render index.html on the main page, specify the root
app.get('*', function (request, response) {
    console.log(request.originalUrl);
    response.sendFile(config.appPath, { root: '.', headers: { page: request.originalUrl } });
});

// Tell the app to listen for requests on port 3000
app.listen(config.port, function () {
    console.log('Listening on port ' + config.port);
});

// Middleware to check if user is connected
function isLogin(request, response, next) {
    console.log('Check Token.');

    try {
        jwt.verify(request.header('authorization'), config.secret);
        next();
    } catch(error) {
        response.sendFile(config.appPath, { root: '.', headers: { page: '404' } });
    }
}