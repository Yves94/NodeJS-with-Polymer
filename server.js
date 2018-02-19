// Node.js notation for importing packages
var express = require('express');
var jwt = require('jsonwebtoken');

// Spin up a server
var app = express();

// Serve static files from the main build directory
app.use(express.static(__dirname + '/build/default'));

// Check specific page
app.get('/question', function (request, response) {
    console.log('Question.');
    response.sendFile('index.html', { root: '.', headers: { page: '404' } });
});

app.post('/login', function(request, response) {
    console.log('User want to login.');

    var token = jwt.sign({'sub': 'login', 'iss': 'Yves Legris', 'aud': 'admin'}, 'secret');

    response.json({
        token: token
    });
});

// Render index.html on the main page, specify the root
app.get('*', function (request, response) {
    console.log(request.originalUrl);
    response.sendFile('index.html', { root: '.', headers: { page: request.originalUrl } });
});

// Tell the app to listen for requests on port 3000
app.listen(3000, function () {
    console.log('Listening on port 3000');
});