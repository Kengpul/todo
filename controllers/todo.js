const Todo = require('../models/todo');
const User = require('../models/users');

module.exports.index = async (req, res) => {
    const user = await User.findById(req.user._id).populate('todos');
    res.render('todo/index', { user });
}

module.exports.createTodo = async (req, res) => {
    const todo = new Todo({ todo: req.body.todo });
    const user = await User.findById(req.user._id);
    user.todos.push(todo);
    todo.user = user._id;
    await user.save();
    await todo.save();
    req.flash('success', 'Created a new todo!');
    res.redirect('/todo')
}

module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.user._id, { $pull: { todos: id } })
    res.redirect('/todo')
}