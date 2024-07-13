const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/FarmStandApp');

// const p = new Product ({
//     name: 'Ruby Grapefruit', 
//     price: 1.99,
//     category: 'fruit'
// });

// p.save()
// .then(p=>{console.log(p)})
// .catch(e=>{console.log(e)});