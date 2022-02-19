const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOveride = require('method-override');

const Todo = require('./models/todo');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOveride('_method'));

mongoose.connect('mongodb://localhost:27017/todoApp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.get('/', async (req, res) => {
    const todos = await Todo.find({});
    res.render('index', {todos});
})
app.post('/todo', async (req, res) => {
    const todo = new Todo({todo: req.body.todo});
    await todo.save();
    res.redirect('/')
})
app.delete('/todo/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Port 300');
})