const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOveride = require('method-override');
const ExpressError = require('./utils/ExpressError');

const todoRoutes = require('./routes/todo');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOveride('_method'));
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/todoApp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.use('/', todoRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Something Went Wrong!';
    res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log('Port 300');
})