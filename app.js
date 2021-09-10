const express = require('express');

const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

console.log("DB URL: " + process.argv[2]);
const url = 'mongodb://' +process.argv[2] +':27017/movies';



mongoose.connect(url, function (err) {
    if (err) {
        return console.log('Mongoose - Connection Error:', err);
    }

    console.log('Connect Successfully');

});

app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/avgmovies', actors.getAvg);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/deleteActorMovies/:id', actors.deleteOneAndMovies);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:aId/:mId', actors.removeMovie);
app.put('/actors/:aId/:mId', actors.addMovie);


app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.put('/movies/:mId/:aId', movies.addActor);
app.delete('/movies/:mId/:aId', movies.removeActor);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/deleteByYear', movies.deleteByYear);
app.delete('/movies/:id', movies.deleteOne);
app.get('/movies/:year1/:year2', movies.getByYear);
