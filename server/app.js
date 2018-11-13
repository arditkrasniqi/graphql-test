const express = require('express');
const app = express();
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const bodyParser = require('body-parser');

// connect to mongodb
// mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@ds119072.mlab.com:19072/graphql`, {
mongoose.connect('mongodb://127.0.0.1:27017/graphdb', {
    useNewUrlParser: true
}).catch(err => {
    console.log(err);
});

// Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    }
    next();
});

// the graphql route
app.use('/graphql', bodyParser.json(), graphqlHTTP({
    schema,
    graphiql: true
}));

// handle errors for not found router (404)
app.use((req, res, next) => {
    const error = new Error('Requested page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;