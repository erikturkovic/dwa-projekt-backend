const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poslodavacSchema = new Schema({
    email: String,
    ime: String,
    prezime: String,
    password: String,
    vrsta : String
})

const poslodavac = mongoose.model('poslodavac',poslodavacSchema);
module.exports = poslodavac;