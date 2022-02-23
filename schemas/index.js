const Joi = require('joi');

module.exports.todoSchema = Joi.object({
    todo: Joi.string().required(),
})