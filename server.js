const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient("mongodb+srv://test:test@cluster0-dbhou.gcp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

client.connect((err, database) => {
    db = database.db("test")
    app.listen(3000, function () {
        console.log('listening on 3000')
    })

    app.get('/', (req, res) => {
        var cursor = db.collection('quotes').find().toArray(function (err, result) {
            console.log('kya baat bhai mast')
            if (err) { return console.log(err) }
            console.log('haanbhai', result)
            res.render('index.ejs', { quotes: result })
        })
    })

    app.post('/quotes', (req, res) => {
        db.collection('quotes').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.redirect('/')
        })
    })
})
