const express= require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const Farm = require('./models/farm');
const categories = ['fruit', 'vegetable', 'dairy', 'mushroom', 'honey'];

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/FarmStandApp');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// app.use(()=>{
//     console.log("We have got a new request!!!")
// })

// Product routes:

app.get('/products', async (req, res) => {
    const {category} = req.query;

    // If we have a category in req.query
    if (category) {
        const products = await Product.find({category});
        res.render('products/index', {products, category})

    } else {
        // If we don't have a category in req.query
        const products = await Product.find({});
        res.render('products/index', {products, category: 'All'})
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories})
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)
    // console.log(req.body);
    // res.send("PUT!")
})

app.get('/products/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product})
    // console.log(product);
    // res.send('Details Page')
})

app.post('/products', async (req, res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
    // console.log(newProduct);
    // res.send('Making your product!')
})

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
    // res.send('You made it!')
})

// Farm routes:

// This route is only rendering a form where a user can create a new farm
app.get('/farms/new', (req, res) => {
    res.render('farms/new');
})

// This route posts data from the form
app.post('/farms', async (req, res) => {
    res.send(req.body);
})

app.listen(3000, (req, res) =>{
    console.log("App is listening on port 3000!!!")
})