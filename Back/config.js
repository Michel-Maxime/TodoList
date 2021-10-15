const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

module.exports = {
    app,
    PORT,
    HOST
}