const  Invoice = require("./invoice.model");
const Joi = require('joi');

const findAllInvoices = (req, res, next) => {
    const {page = 1, perPage = 10, filter,sortField, sortDir} = req.query
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(perPage, 10),
        populate: 'client',
    };
    const query = {};
    if (filter) {
      query.item = {
        $regex: filter,
      };
    }
    if (sortField && sortDir) {
      options.sort = {
        [sortField]: sortDir,
      };
    }
    Invoice.paginate(query, options)
    .then((invoices) => res.json(invoices))
    .catch((err) => res.status(500).json(err))

}

const createInvoice = (req, res) => {
    
    const {item, qty, date, due, tax, rate} = req.body;

    const schema = Joi.object({
        item: Joi.string().required(),
        qty: Joi.number().required(),
        date: Joi.date().required(),
        due: Joi.date().required(),
        tax: Joi.number().integer().optional(),
        rate: Joi.number().optional(),
        client: Joi.string().required()
    })

    if(!item) {
        res.status(400);
        throw new Error('Item is required field')
    }
    if(!qty) {
        res.status(400)
        throw new Error('Qty is required field')
    }
    if(!date) {
        res.status(400)
        throw new Error('Date is required field')
    }
    if(!due) {
        res.status(400)
        throw new Error('Duedate is required field')
    }
  
    const result = schema.validate(req.body);


    Invoice.create(result.value)
    .then((invoice) => {
        res.json(invoice)
    })
    .catch(error => res.status(500).json(error + 'problem'))
    

}

const findOneInvoice = (req, res) => {
    let {id} = req.params;
    Invoice.findById(id)
    .then(invoice => {
        if(!invoice) {
            return res.status(404).json({err: 'invoice not found with this id'})
        }

        return res.json(invoice)
    })

}


const deleteInvoice = (req, res) => {
    let {id} = req.params;
    Invoice.findByIdAndRemove(id)
    .then(invoice => {
        if(!invoice) {
            return res.status(404).json({err: 'Could not delete any invoice with this id'})
        }

        return res.json(invoice)
    })
    .catch(err => res.status(501).json(err))

}


const updateInvoice = (req, res) => {

    let {id} = req.params;
    
    const schema = Joi.object({
        item: Joi.string().optional(),
        qty: Joi.number().optional(),
        date: Joi.date().optional(),
        due: Joi.date().optional(),
        tax: Joi.number().integer().optional(),
        rate: Joi.number().optional(),
        client: Joi.string().required()
    });


    const result = schema.validate(req.body);


    Invoice.findOneAndUpdate({_id: id}, result.value, {new:true})
    .then((invoice) => {
        res.json(invoice)
    })
    .catch(err => res.status(500).json(err))

}


module.exports = {
    findAllInvoices,
    createInvoice,
    findOneInvoice,
    deleteInvoice,
    updateInvoice
}