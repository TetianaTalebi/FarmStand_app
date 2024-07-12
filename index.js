const express= require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(()=>{
    console.log("We have got a new request!!!")
})

app.listen(3000, (req, res) =>{
    console.log("App is listening on port 3000!!!")
})