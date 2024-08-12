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
    },
    // In this app two-sided Mongo DB relationship is used
    // product has a reference to a farm and a farm has a reference to a product
    farm: { type: Schema.Types.ObjectId,
        ref: 'Farm'  // This is a reference to a 'Farm' Mongoose Model
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;