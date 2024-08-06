const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8888;
const routes = require('./routes/index.routes');

app.use(morgan(process.env.LOG_STATUS || "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);


app.use((req, res, next) => {
    next(createHttpError.NotFound());
})

app.use((error, req, res, next) => {
    error.status = error.status || createHttpError[500];
    res.status(error.status);
    res.json(error);
})

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
}).then(() => {
    console.log('🃏 DB connected');
    app.listen(PORT, () => {
        console.log(`Running on PORT: ${PORT}`);
    })
}).catch((err) => {
    console.log(err.message);
})

