import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    email: {
        unique:true,
        required:true,
        type:String
    },
    ime: String,
    prezime: String,
    password: String,
    vrsta : String
})

const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;