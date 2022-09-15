const Joi = require('joi')

const validateSchema = (body) => {

    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
    })

    const result = schema.validate(body);

    return result;
}

const validateUpdateSchema = (body) => {
    
    const schema = Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        email: Joi.string().email().optional(),
    })

    const result = schema.validate(body);

    return result;
}



module.exports = {
    validateSchema,
    validateUpdateSchema
}