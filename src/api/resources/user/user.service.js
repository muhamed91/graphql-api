const Joi = require('joi')

const validateUserSchema = (body) => {

    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    const result = schema.validate(body);

    return result;
}



module.exports = {
    validateUserSchema,
}