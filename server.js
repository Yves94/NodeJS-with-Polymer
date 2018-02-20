// Node.js notation for importing packages
var express = require('express');
var jwt = require('jsonwebtoken');

// Spin up a server
var app = express();

// Serve static files from the main build directory
app.use(express.static(__dirname + '/build/default'));

// Check specific page
app.get('/question', isLogin, function (request, response) {
    console.log('Question.');
    response.sendFile('index.html', { root: '.', headers: { page: request.originalUrl } });
});

app.post('/login', function(request, response) {
    var token = jwt.sign({'sub': 'login', 'iss': 'Yves Legris', 'aud': 'admin'}, 'secret');

    response.json({
        token: token
    });
});

// Render index.html on the main page, specify the root
app.get('*', function (request, response) {
    response.sendFile('index.html', { root: '.', headers: { page: request.originalUrl } });
});

// Tell the app to listen for requests on port 3000
app.listen(3000, function () {
    console.log('Listening on port 3000');
});

// Middleware to check if user is connected
function isLogin(request, response, next) {
    console.log('Check Token.');

    try {
        var decoded = jwt.verify(request.header('authorization'), 'secret');
        console.log(decoded);
        next();
    } catch(error) {
        response.sendFile('index.html', { root: '.', headers: { page: '404' } });
    }
}