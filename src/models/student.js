const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    email: {
        unique:true,
        type:String
    },
    ime: String,
    prezime: String,
    password: String,
    vrsta : String
})

const student = mongoose.model('User',userSchema);
module.exports = student;