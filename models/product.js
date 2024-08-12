const mongoose = require('mongoose');

// Destructuring Schema from mongoose.Schema (i.e. creating a short cut for mongoose.Schema)
const {Schema} = mongoose; // This code is equal to: const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {     
            type: String,
            required: true
          },
    price: {     
            type: Number, 
             required: true,
                  min: 0
          },
    category: {
            type: String,
        lowercase: true,
            enum: ['fruit', 'vegetable', 'dairy']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;