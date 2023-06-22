var express = require('express')
var conn = require('./db')
var app = express()
app.use(express.json())

app.get('/getUsuario', function(req, res){
    var query = conn.query(
        'SELECT * FROM user;',
        function(err, result){
            if(err)throw err
            res.send(result)
        }
    )
})

app.get('/postUsuario', function(req, res){
    var query = conn.query(
        'SELECT * FROM user;',
        function(err, result){
            if(err)throw err
            res.send(result)
        }
    )
})

app.listen(5000,
    ()=>console.log('Server on port', 5000)
)