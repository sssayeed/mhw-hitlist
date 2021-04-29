
app.post('/auth', function(request, response){
    var username = request.body.username
    var password = request.body.password

    if(username && password) {
        connection.query('SELECT FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fiellds){
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