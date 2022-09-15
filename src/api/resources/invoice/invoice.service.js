const Joi = require('joi')

const validateSchema = (body) => {

    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string.email().required(),
    })


    const {error, value } = Joi.v


}


module.exports = {
    validateSchema,
}