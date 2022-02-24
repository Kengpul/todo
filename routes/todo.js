const express = require('express')
const router = express.Router();
const todo = require('../controllers/todo');
const catchAsync = require('../utils/catchAsync');
const {validateTodo} = require('../middleware');

router.get('/', catchAsync(todo.index));

router.post('/todo', validateTodo, catchAsync(todo.createTodo));

router.delete('/todo/:id', catchAsync(todo.deleteTodo));

module.exports = router;