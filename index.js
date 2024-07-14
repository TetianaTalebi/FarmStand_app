const express= require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/FarmStandApp');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(()=>{
//     console.log("We have got a new request!!!")
// })

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {products})
    // console.log(products);
    // res.send('All products will be here!!!')
})

app.get('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product})
    // console.log(product);
    // res.send('Details Page')
})

app.listen(3000, (req, res) =>{
    console.log("App is listening on port 3000!!!")
})