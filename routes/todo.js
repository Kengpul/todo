const express = require('express')
const router = express.Router();
const todo = require('../controllers/todo');
const catchAsync = require('../utils/catchAsync');
const {validateTodo, isLoggedIn} = require('../middleware');

router.get('/', isLoggedIn, catchAsync(todo.index));

router.post('/', isLoggedIn, validateTodo, catchAsync(todo.createTodo));

router.delete('/:id', isLoggedIn, catchAsync(todo.deleteTodo));

module.exports = router;