const express = require('express');
const { findAllInvoices, createInvoice, findOneInvoice, deleteInvoice, updateInvoice } = require('../api/controllers/invoice.controller');

const router = express.Router();


router.get('/invoices', findAllInvoices);
router.get('/invoice/:id', findOneInvoice);
router.delete('/invoice/:id', deleteInvoice);
router.put('/invoice/:id', updateInvoice);
router.post('/invoice', createInvoice);


module.exports = router;