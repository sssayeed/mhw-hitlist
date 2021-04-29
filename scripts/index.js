var mysql = require('mysql')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')
const { request } = require('http')

var app = express()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Poopoo121',
    database: 'mhwhit'
})

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get('/', function(request, response){
    if(request.session.loggedin) {
        response.sendFile(path.join(__dirname + "/../html/index.html"))
    }
    else{
        response.sendFile(path.join(__dirname + "/../html/login.html"))
    }
})


app.post('/auth', function(request, response){
    var username = request.body.username
    var password = request.body.password

    if(username && password) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fiellds){
            if(results.length > 0) {
                request.session.username = username
                request.session.loggedin = true
                response.redirect('/')
            }
            else {
                response.send('Incorrect username or password!')
            }
            response.end()
        })
    }
    else {
        response.send('Please enter a username and password')
        response.end()
    }
}) 

app.post('/leave', function(request, response){
    request.session.loggedin = false
    response.redirect('/')
})

app.listen(3000)