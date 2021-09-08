const express = require('express');

const mongoose = require('mongoose');

const actors = require('../routers/actor');
const movies = require('../routers/movie');

const app = express();

app.listen(8080);

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

let url = 'mongodb://localhost:27017/movies';



mongoose.connect(url, function (err) {
    if (err) {
        return console.log('Mongoose - Connection Error:', err);
    }

    console.log('Connect Successfully');

});

app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);

app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);