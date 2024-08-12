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
    },
    // In this app two-sided Mongo DB relationship is used
    // product has a reference to a farm and a farm has a reference to a product
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Product' // This is a reference to the 'Product' Mongoose Model
    }
});