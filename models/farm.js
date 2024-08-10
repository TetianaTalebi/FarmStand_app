const mongoose = require('mongoose');

// Destructuring Schema from mongoose object
// Creating a shortcut for mongoose.Schema
const {Schema} = mongoose; // This line of code is equal to: const Schema = mongoose.Schema;

// Defining a basic model for a farm
const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!!!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'E-mail is required!!!']
    }
});