const {todoSchema} = require('../schemas');
const ExpressError = require('../utils/ExpressError');

module.exports.validateTodo = (req, res, next) => {
    const {error} = todoSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}