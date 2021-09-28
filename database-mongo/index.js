const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa', {useNewUrlParser: true, useUnifiedTechnology: true});

const db = mongoose.connection;
