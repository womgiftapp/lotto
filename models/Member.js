const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },    
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('members', MemberSchema);