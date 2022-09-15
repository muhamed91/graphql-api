const Joi = require('joi');
const { updateMany } = require('./client.model');
const Client = require('./client.model');
const { validateSchema, validateUpdateSchema } = require('./client.service');


exports.createClient = async (req,res) => {

    try {
        const {value } = validateSchema(req.body);
    
      const client = await Client.create(value);
      return res.json(client);
        
    } catch (error) {
        res.status(500).json(error)
    }

}


exports.findAllClients = async (req,res) => {

    try {

        const client = await Client.find();
        return res.json(client);
        
    } catch (error) {
        res.status(500).json(error)
    }

}




exports.findOneClient = async (req,res) => {
    try {
        let id = req.params.id;
        const client  = await Client.findById(id);
        return res.json(client)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.deleteClient = async (req, res) => {
    let {id} = req.params;
    const client = await Client.findByIdAndRemove(id)
    .then(client => {
        if(!client) {
            return res.status(404).json({err: 'Could not delete any client with this id'})
        }

        return res.json(client)
    })
    .catch(err => res.status(501).json(err))

}

exports.updateClient = async (req,res) => {
    try {
        
        const {value } = validateUpdateSchema(req.body)
        const client = await Client.findOneAndUpdate({_id: req.params.id}, value, {new: true});

        if(!client) {
            return res.status(404).json({err: 'Could not update any client with this id'})
        }

        return res.json(client)
        
    } catch (error) {
        res.status(500).json(error)
    }
}



