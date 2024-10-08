const mongoose = require('mongoose');
const Product = require('./product');

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
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product' // This is a reference to the 'Product' Mongoose Model
    }]
});

farmSchema.post('findOneAndDelete', async function(farm){
    // console.log("Post Mongoose Middleware!!!");
    // console.log(farm);
    if (farm.products.length) {
        const res = await Product.deleteMany({_id: {$in: farm.products}});
        console.log(res);
    }
});

// Defining 'Farm' model
const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;