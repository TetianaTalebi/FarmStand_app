const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/FarmStandApp');

const seedProducts = [
    {    name: 'Red Apple',
        price: 0.50,
        category: 'fruit'
    },
    {    name: 'Yellow Apple',
        price: 0.60,
        category: 'fruit'
    },
    {    name: 'Potato',
        price: 0.18,
        category: 'vegetable'
    },
    {    name: 'Carrot',
        price: 0.25,
        category: 'vegetable'
    },
    {    name: 'Onion',
        price: 0.30,
        category: 'vegetable'
    },
    {    name: 'Garlic',
        price: 0.10,
        category: 'vegetable'
    },
    {    name: 'Cow Milk',
        price: 1.50,
        category: 'dairy'
    },
    {    name: 'Cream',
        price: 2.10,
        category: 'dairy'
    },
    {    name: 'Orange',
        price: 1.80,
        category: 'fruit'
    },
    {    name: 'Pepper',
        price: 1.64,
        category: 'vegetable'
    }
];

Product.insertMany(seedProducts)
.then(() => {console.log("OK!!!")})
.catch((e) => {console.log(e)});

// const p = new Product ({
//     name: 'Ruby Grapefruit', 
//     price: 1.99,
//     category: 'fruit'
// });

// p.save()
// .then(p=>{console.log(p)})
// .catch(e=>{console.log(e)});