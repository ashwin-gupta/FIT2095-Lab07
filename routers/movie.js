const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Movie.find().populate('actors').exec( function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        })
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;

        newMovieDetails._id = new mongoose.Types.ObjectId();

        Movie.create(newMovieDetails, function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({
            _id: req.params.id
        }).populate('actors').exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        })
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({
            _id: req.params.id
        }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },
    removeActor: function (req, res) {
        console.log(req.params);

        Movie.updateOne({
            _id: req.params.mId
        }, {
            $pullAll: {
                actors: [req.params.aId]
            }
        }, {
            new: true
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    addActor: function (req, res) {
        Movie.findOne({
            _id: req.params.mId
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({
                _id: req.params.aId
            }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    getByYear: function (req, res) {
        Movie.find({
            $and: [{
                year: {
                    $gte: req.params.year1
                }
            }, {
                year: {
                    $lte: req.params.year2
                }
            }]
        }, function (err, movies) {

            if (err) return res.status(400).json(err);

            res.json(movies);

        });
    },

    deleteByYear: function (req, res) {

        console.log(req.body);
        Movie.deleteMany({
            $and: [{
                year: {
                    $gte: req.body.year1
                }
            }, {
                year: {
                    $lte: req.body.year2
                }
            }]
        }, function (err, movies) {

            if (err) return res.status(400).json(err);

            res.json(movies);

        });
    }
}