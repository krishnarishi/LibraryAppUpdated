const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    genre: String,
    image: {
        data: Buffer,
        mimetype: String,
        name: String
    }
});

var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;