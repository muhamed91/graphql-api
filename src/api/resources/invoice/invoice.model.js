const mongoose  = require("mongoose");
const mongoosePaginate  = require("mongoose-paginate")


const {Schema} = mongoose;

const InvoiceSchema = new Schema({
    item: {
        type: String,

    },
    qty: {
        type: Number,

    },
    date: {
        type: Date,

    },
    due: {
        type: Date,

    },
    rate: {
        type: Number,
      
    },
    tax: {
        type: Number,

    },
    client: {
        ref: 'Client',
        type: Schema.Types.ObjectId,

    }

});

InvoiceSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Invoice', InvoiceSchema);
