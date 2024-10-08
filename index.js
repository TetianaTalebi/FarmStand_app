const express= require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const sessionOptions = {
    secret: 'notagoodsecret', 
    resave: false,
    saveUninitialized: false
};

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
app.use(session(sessionOptions));
app.use(flash());

// This middleware adds 'messages' onto the res object 
// So, it will be an access to flash messages on every single template
app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
});

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
    const product = await Product.findById(id).populate('farm', 'name');
    res.render('products/show', {product})
    // console.log(product);
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

// This route is rendering a list of farms that are saved in the data base
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms});
    // res.send(farms);
})

// This route is only rendering a form where a user can create a new farm
app.get('/farms/new', (req, res) => {
    res.render('farms/new');
})

// This route renders a show page for the chosen farm
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', {farm});
    // console.log(farm);
})

app.delete('/farms/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})

// This route posts data from the form
app.post('/farms', async (req, res) => {
    // res.send(req.body);
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm !!!');
    res.redirect('/farms');
})

// Defining a nested route. This route renders a form.
// This route helps to add a new product into the database that is associated with a particular farm

app.get('/farms/:id/products/new', async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', {categories, farm});
})

app.post('/farms/:id/products', async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    
    const {name, price, category} = req.body;
    const product = new Product({name, price, category});

    farm.products.push(product);
    product.farm = farm;

    await farm.save();
    await product.save();

    res.redirect(`/farms/${farm._id}`);
})

app.listen(3000, (req, res) =>{
    console.log("App is listening on port 3000!!!")
})