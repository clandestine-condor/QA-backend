const mongoose = require('mongoose');

const { Mongoose } = require("mongoose");

mongoose.connect('mongodb://localhost:27017/qa', {useNewUrlParser: true, useUnifiedTechnology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected!')
});

const answers = mongoose.model(
    "answers",
    new mongoose.Schema({
        aId: Number,
        body: String,
        answererName: String,
        helpfulness: Number,
        reported: Boolean,
        data: Date,
        questionId: Number, // two-way connection
        photos: [
            String 
        ]
    })
);

const questions = mongoose.model(
    "questions",
    new mongoose.Schema({
        questionId: Number,
        questionBody: String,
        questionDate: Date,
        askerName: String,
        questionHelpfulness: Number,
        reported: Boolean,
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "answers"
            }
        ],
        productId: Number
        
    })
);
// two way look up for mongo look up on QA
// nest photos in array of answers or have it as entire schema
module.exports = photos;
module.exports = answers;
module.exports = questions;
