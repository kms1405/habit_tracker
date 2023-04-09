const express = require("express");
const bodyparser = require('body-parser');
const db = require("./config/mongoose");
// const rootDir= require("./")
const app = express();
const port=8082;
const expressLayouts = require('express-ejs-layouts');
const path  = require("path");

app.use(expressLayouts);

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))



// views setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,"views"));

// body parser setup
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

// Router setup
app.use("/",require("./routes"));

app.listen(port, function (err){
    if (err){
        console.log("while start the server",err)
    }

    console.log("sever started port:",port);
})